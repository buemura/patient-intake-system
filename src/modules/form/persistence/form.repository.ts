import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';
import { CreateForm, Form } from '../form.entity';

export const FORM_REPOSITORY = Symbol('FORM_REPOSITORY');

export interface FormRepository {
  findById(id: string): Promise<Form | null>;

  findByLocationAndInsurance(
    insuranceType: InsuranceType,
    location: PatientLocation,
  ): Promise<Form | null>;

  createForm(form: CreateForm): Promise<Form>;
}
