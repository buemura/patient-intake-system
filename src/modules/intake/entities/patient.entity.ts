export enum PatientLocation {
  URBAN = 'urban',
}

export enum InsuranceType {
  UNIMED = 'unimed',
  BRADESCO = 'bradesco',
}

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
