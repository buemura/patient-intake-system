import { CreateForm, Form } from '../entities/form.entity';
import { InsuranceType, PatientLocation } from '../entities/patient.entity';

export const FORM_REPOSITORY = Symbol('FORM_REPOSITORY');

export interface FormRepository {
  findById(id: string): Promise<Form | null>;

  findByLocationAndInsurance(
    insuranceType: InsuranceType,
    location: PatientLocation,
  ): Promise<Form | null>;

  createForm(form: CreateForm): Promise<Form>;
}
