import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  IntakeBasicFormRequestDto,
  IntakeBasicFormResponseDto,
} from './dtos/basic-form.dto';
import { FollowUpForm } from './dtos/followup-form.dto';
import { Form } from './entities/form.entity';
import { IntakeStatus } from './entities/intake.entity';
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
  ) {}

  private async getNextForm(
    location: PatientLocation,
    insuranceType: InsuranceType,
  ): Promise<Form | null> {
    return this.formRepository.findOne(insuranceType, location);
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

    // Publish event to validate the intake
    return updatedIntake;
  }
}
