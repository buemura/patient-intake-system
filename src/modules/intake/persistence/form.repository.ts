import { CreateForm, Form } from '../entities/form.entity';
import { InsuranceType, PatientLocation } from '../entities/patient.entity';

export const FORM_REPOSITORY = Symbol('FORM_REPOSITORY');

export interface FormRepository {
  findOne(
    insuranceType: InsuranceType,
    location: PatientLocation,
  ): Promise<Form | null>;

  createForm(form: CreateForm): Promise<Form>;
}
