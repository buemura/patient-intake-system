import { Inject, Injectable } from '@nestjs/common';

import { Patient } from './patient.entity';
import { InsuranceType, PatientLocation } from './patient.enum';
import {
  PATIENT_REPOSITORY,
  PatientRepository,
} from './persistence/patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: PatientRepository,
  ) {}

  async createPatient(data: {
    name: string;
    age: number;
    location: PatientLocation;
    insurance: InsuranceType;
  }): Promise<Patient> {
    const createdPatient = await this.patientRepository.createPatient({
      name: data.name,
      age: data.age,
      location: data.location,
      insurance: data.insurance,
    });
    return createdPatient;
  }
}
