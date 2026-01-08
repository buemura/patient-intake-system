import { Module } from '@nestjs/common';

import { QueueModule } from '@/shared/queue/queue.module';
import { IntakeModule } from '../intake/intake.module';
import { EligibilityConsumer } from './eligibility.consumer';

@Module({
  imports: [QueueModule, IntakeModule],
  controllers: [EligibilityConsumer],
})
export class EligibilityModule {}
