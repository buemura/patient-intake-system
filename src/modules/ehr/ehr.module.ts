import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { EhrConsumer } from './ehr.consumer';

@Module({
  imports: [QueueModule],
  controllers: [EhrConsumer],
})
export class EhrModule {}
