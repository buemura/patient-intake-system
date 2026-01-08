import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { EligibilityConsumer } from './eligibility.consumer';

@Module({
  imports: [QueueModule],
  controllers: [EligibilityConsumer],
})
export class EligibilityModule {}
