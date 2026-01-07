import { Inject, Injectable } from '@nestjs/common';
import { Form } from '../intake/entities/form.entity';
import {
  FORM_REPOSITORY,
  type FormRepository,
} from '../intake/persistence/form.repository';
import { CreateFormDto } from './dtos/create-form.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(FORM_REPOSITORY)
    private readonly formRepository: FormRepository,
  ) {}

  async addNewForm(body: CreateFormDto): Promise<Form> {
    const newForm = await this.formRepository.createForm({
      insuranceType: body.insuranceType,
      location: body.location,
      fields: body.fields,
    });
    return newForm;
  }
}
