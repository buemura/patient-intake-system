import { InsuranceType, PatientLocation } from './patient.enum';

export class CreatePatient {
  name: string;
  age: number;
  location: PatientLocation;
  insurance: InsuranceType;
}

export class Patient {
  id: string;
  name: string;
  age: number;
  location: PatientLocation;
  insurance: InsuranceType;
  createdAt: Date;
  updatedAt: Date;
}
