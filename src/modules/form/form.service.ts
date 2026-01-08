import { Inject, Injectable } from '@nestjs/common';

import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';
import { CreateFormDto } from './dtos/create-form.dto';
import { Form } from './form.entity';
import { FORM_REPOSITORY, FormRepository } from './persistence/form.repository';

@Injectable()
export class FormService {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: FormRepository,
  ) {}

  async getFormByLocationAndInsurance(
    location: PatientLocation,
    insuranceType: InsuranceType,
  ): Promise<Form | null> {
    const form = await this.formRepository.findByLocationAndInsurance(
      insuranceType,
      location,
    );
    return form;
  }

  async getFormById(id: string): Promise<Form | null> {
    const form = await this.formRepository.findById(id);
    return form;
  }

  async addNewForm(body: CreateFormDto): Promise<Form> {
    const newForm = await this.formRepository.createForm({
      insuranceType: body.insuranceType,
      location: body.location,
      fields: body.fields,
    });
    return newForm;
  }
}
