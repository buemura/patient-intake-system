import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { PatientService } from './patient.service';
import { MongoosePatientRepository } from './persistence/mongoose/mongoose-patient.repository';
import { PATIENT_REPOSITORY } from './persistence/patient.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    PatientService,
    {
      provide: PATIENT_REPOSITORY,
      useClass: MongoosePatientRepository,
    },
  ],
  exports: [PatientService],
})
export class PatientModule {}
