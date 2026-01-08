import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeModule } from '../intake/intake.module';
import { EhrConsumer } from './ehr.consumer';

@Module({
  imports: [QueueModule, IntakeModule],
  controllers: [EhrConsumer],
})
export class EhrModule {}
