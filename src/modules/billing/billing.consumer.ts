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
export class BillingConsumer extends QueueConsumer {
  constructor() {
    super();
  }

  @EventPattern(QUEUES.BILLING_CREATE, Transport.RMQ)
  async createBilling(
    @Payload() data: Intake,
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(`Received message in queue ${QUEUES.BILLING_CREATE}:`, data);
    this.ackMessage(ctx);
    await Promise.resolve();
  }
}
