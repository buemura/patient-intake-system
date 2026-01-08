import { InsuranceType, PatientLocation } from './patient.entity';

export class FormField {
  name: string;
  dataType: string;
  required: boolean;
}

export class CreateForm {
  insuranceType: InsuranceType;
  location: PatientLocation;
  fields: FormField[];
}

export class Form {
  id: string;
  insuranceType: InsuranceType;
  location: PatientLocation;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}
