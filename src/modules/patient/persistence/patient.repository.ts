import { CreatePatient, Patient } from '../patient.entity';

export const PATIENT_REPOSITORY = Symbol('PATIENT_REPOSITORY');

export interface PatientRepository {
  findById(id: string): Promise<Patient | null>;
  createPatient(patient: CreatePatient): Promise<Patient>;
}
