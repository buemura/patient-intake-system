import { Module } from '@nestjs/common';

import { FormModule } from '@/modules/form/form.module';
import { PatientModule } from '@/modules/patient/patient.module';
import { DatabaseModule } from '@/shared/database/database.module';
import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeConsumer } from './intake.consumer';
import { IntakeController } from './intake.controller';
import { IntakeService } from './intake.service';
import { INTAKE_REPOSITORY } from './persistence/intake.repository';
import { MongooseIntakeRepository } from './persistence/mongoose/mongoose-intake.repository';

@Module({
  imports: [DatabaseModule, QueueModule, PatientModule, FormModule],
  controllers: [IntakeController, IntakeConsumer],
  providers: [
    IntakeService,
    {
      provide: INTAKE_REPOSITORY,
      useClass: MongooseIntakeRepository,
    },
  ],
  exports: [IntakeService],
})
export class IntakeModule {}
