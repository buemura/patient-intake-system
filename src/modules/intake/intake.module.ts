import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/shared/database/database.module';
import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeConsumer } from './intake.consumer';
import { IntakeController } from './intake.controller';
import { IntakeService } from './intake.service';
import { FORM_REPOSITORY } from './persistence/form.repository';
import { INTAKE_REPOSITORY } from './persistence/intake.repository';
import { MongooseFormRepository } from './persistence/mongoose/mongoose-form.repository';
import { MongooseIntakeRepository } from './persistence/mongoose/mongoose-intake.repository';
import { MongoosePatientRepository } from './persistence/mongoose/mongoose-patient.repository';
import { PATIENT_REPOSITORY } from './persistence/patient.repository';

@Module({
  imports: [DatabaseModule, QueueModule],
  controllers: [IntakeController, IntakeConsumer],
  providers: [
    IntakeService,
    {
      provide: PATIENT_REPOSITORY,
      useClass: MongoosePatientRepository,
    },
    {
      provide: FORM_REPOSITORY,
      useClass: MongooseFormRepository,
    },
    {
      provide: INTAKE_REPOSITORY,
      useClass: MongooseIntakeRepository,
    },
  ],
})
export class IntakeModule {}
