import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { BillingConsumer } from './billing.consumer';

@Module({
  imports: [QueueModule],
  controllers: [BillingConsumer],
})
export class BillingModule {}
