import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { SchedulingConsumer } from './scheduling.consumer';

@Module({
  imports: [QueueModule],
  controllers: [SchedulingConsumer],
})
export class SchedulingModule {}
