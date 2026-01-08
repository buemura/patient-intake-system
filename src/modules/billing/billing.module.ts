import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeModule } from '../intake/intake.module';
import { BillingConsumer } from './billing.consumer';

@Module({
  imports: [QueueModule, IntakeModule],
  controllers: [BillingConsumer],
})
export class BillingModule {}
