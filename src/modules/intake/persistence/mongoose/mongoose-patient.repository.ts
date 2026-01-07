import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { PATIENT_MODEL } from '@/shared/database/mongoose/mongoose.provider';
import { CreatePatient, Patient } from '../../entities/patient.entity';
import { PatientRepository } from '../patient.repository';

@Injectable()
export class MongoosePatientRepository implements PatientRepository {
  constructor(
    @Inject(PATIENT_MODEL)
    private readonly patientModel: Model<Patient>,
  ) {}

  private toEntity(doc: Patient & { _id: any }): Patient {
    return {
      id: doc._id.toString(),
      name: doc.name,
      age: doc.age,
      location: doc.location,
      insurance: doc.insurance,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) return null;

    return this.toEntity(patient);
  }

  async createPatient(patient: CreatePatient): Promise<Patient> {
    const createdPatient = await this.patientModel.create(patient);
    return this.toEntity(createdPatient);
  }
}
