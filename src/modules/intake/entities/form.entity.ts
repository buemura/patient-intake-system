import { InsuranceType, PatientLocation } from './patient.entity';

class FormField {
  name: string;
  dataType: string;
  required: boolean;
}

export class Form {
  id: string;
  insuranceType: InsuranceType;
  location: PatientLocation;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}
