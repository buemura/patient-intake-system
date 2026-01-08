import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { EVENT, EVENTS_EXCHANGE } from '@/shared/queue/queue';
import { IQueueService, QUEUE_SERVICE } from '@/shared/queue/queue.service';
import {
  IntakeBasicFormRequestDto,
  IntakeBasicFormResponseDto,
} from './dtos/basic-form.dto';
import { FollowUpForm } from './dtos/followup-form.dto';
import { Form, FormField } from './entities/form.entity';
import { Intake, IntakeStatus } from './entities/intake.entity';
import { InsuranceType, PatientLocation } from './entities/patient.entity';
import {
  FORM_REPOSITORY,
  type FormRepository,
} from './persistence/form.repository';
import {
  INTAKE_REPOSITORY,
  type IntakeRepository,
} from './persistence/intake.repository';
import {
  PATIENT_REPOSITORY,
  type PatientRepository,
} from './persistence/patient.repository';

@Injectable()
export class IntakeService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: PatientRepository,

    @Inject(FORM_REPOSITORY)
    private readonly formRepository: FormRepository,

    @Inject(INTAKE_REPOSITORY)
    private readonly intakeRepository: IntakeRepository,

    @Inject(QUEUE_SERVICE)
    private readonly queueService: IQueueService,
  ) {}

  private async getNextForm(
    location: PatientLocation,
    insuranceType: InsuranceType,
  ): Promise<Form | null> {
    return this.formRepository.findByLocationAndInsurance(
      insuranceType,
      location,
    );
  }

  async submitBasicForm(
    body: IntakeBasicFormRequestDto,
  ): Promise<IntakeBasicFormResponseDto> {
    const createdPatient = await this.patientRepository.createPatient({
      name: body.name,
      age: body.age,
      location: body.location,
      insurance: body.insurance,
    });

    const nextForm = await this.getNextForm(body.location, body.insurance);
    if (!nextForm) {
      throw new NotFoundException(
        `No form found for location ${body.location} and insurance ${body.insurance}`,
      );
    }

    const intake = await this.intakeRepository.create({
      patientId: createdPatient.id,
      formId: nextForm.id,
    });

    return {
      patientId: createdPatient.id,
      formId: nextForm.id,
      intakeId: intake.id,
      nextForm: {
        location: nextForm.location,
        insurance: nextForm.insuranceType,
        fields: nextForm.fields,
      },
    };
  }

  async submitFollowUpForm(intakeId: string, body: FollowUpForm): Promise<any> {
    const intake = await this.intakeRepository.findById(intakeId);
    if (!intake) {
      throw new NotFoundException(`Intake with id ${intakeId} not found`);
    }

    if (intake.status !== IntakeStatus.IN_PROGRESS) {
      throw new UnprocessableEntityException(
        `Intake with id ${intakeId} is not in progress`,
      );
    }

    const updatedIntake = await this.intakeRepository.addFormAnswers(
      intakeId,
      body.fields,
    );

    if (!updatedIntake) {
      throw new NotFoundException(`Intake with id ${intakeId} not found`);
    }

    // Publish event to validate the intake
    this.queueService.publishMessage(EVENTS_EXCHANGE, EVENT.INTAKE_SUBMITTED, {
      intakeId,
    });

    return updatedIntake;
  }

  async getIntake(intakeId: string): Promise<Intake> {
    const intake = await this.intakeRepository.findById(intakeId);
    if (!intake) {
      throw new NotFoundException(`Intake with id ${intakeId} not found`);
    }
    return intake;
  }

  private validateFormFields(
    fields: FormField[],
    formAnswers: Record<string, any>,
  ): {
    missingFields: string[];
    typeMismatchFields: string[];
  } {
    const missingFields: string[] = [];
    const typeMismatchFields: string[] = [];

    for (const field of fields) {
      const { name, required, dataType } = field;

      const answerValue = formAnswers[name];
      const hasValue =
        answerValue !== undefined && answerValue !== null && answerValue !== '';

      // Check required fields
      if (required && !hasValue) {
        missingFields.push(name);
        continue;
      }

      // Only check type if field exists
      if (hasValue) {
        let typeOk = false;
        switch (dataType) {
          case 'string':
            typeOk = typeof answerValue === 'string';
            break;
          case 'number':
            typeOk =
              typeof answerValue === 'number' ||
              (!isNaN(Number(answerValue)) && answerValue !== '');
            break;
          case 'boolean':
            typeOk = typeof answerValue === 'boolean';
            break;
          case 'date':
            // Accept both Date objects and valid ISO 8601 strings
            if (answerValue instanceof Date && !isNaN(answerValue.valueOf())) {
              typeOk = true;
            } else if (typeof answerValue === 'string') {
              const d = new Date(answerValue);
              typeOk = !isNaN(d.valueOf());
            }
            break;
          default:
            typeOk = true; // Unknown types are just passed
        }
        if (!typeOk) {
          typeMismatchFields.push(name);
        }
      }
    }

    return {
      missingFields,
      typeMismatchFields,
    };
  }

  async processIntakeAnswer(intakeId: string): Promise<void> {
    const intake = await this.intakeRepository.findById(intakeId);
    if (!intake) {
      throw new NotFoundException(`Intake with id ${intakeId} not found`);
    }

    const form = await this.formRepository.findById(intake.formId);
    if (!form) {
      throw new NotFoundException(`Form with id ${intake.formId} not found`);
    }

    const fields = form.fields || [];
    const formAnswers = intake.formAnswers || {};

    const { missingFields, typeMismatchFields } = this.validateFormFields(
      fields,
      formAnswers,
    );

    if (!intake.validationErrors) {
      intake.validationErrors = [];
    }

    for (const field of missingFields) {
      intake.validationErrors.push({
        fieldKey: field,
        message: 'missing field',
      });
    }
    for (const field of typeMismatchFields) {
      intake.validationErrors.push({
        fieldKey: field,
        message: 'incorrect type',
      });
    }

    intake.status = IntakeStatus.COMPLETED;

    await this.intakeRepository.updateIntake(intakeId, intake);
  }
}
