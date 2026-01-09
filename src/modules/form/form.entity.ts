import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';

export enum FormFieldDataTypeEnum {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export class FormField {
  name: string;
  dataType: FormFieldDataTypeEnum;
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
