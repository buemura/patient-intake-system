import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeModule } from '../intake/intake.module';
import { SchedulingConsumer } from './scheduling.consumer';

@Module({
  imports: [QueueModule, IntakeModule],
  controllers: [SchedulingConsumer],
})
export class SchedulingModule {}
