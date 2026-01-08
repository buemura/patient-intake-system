import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import { QUEUES } from '@/shared/queue/queue';
import { QueueConsumer } from '@/shared/queue/queue.consumer';
import { Intake } from '../intake/entities/intake.entity';

@Controller()
export class EligibilityConsumer extends QueueConsumer {
  constructor() {
    super();
  }

  @EventPattern(QUEUES.ELIGIBILITY_CHECK, Transport.RMQ)
  async checkEligibility(
    @Payload() data: Intake,
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(`Received message in queue ${QUEUES.ELIGIBILITY_CHECK}:`, data);
    this.ackMessage(ctx);
    await Promise.resolve();
  }
}
