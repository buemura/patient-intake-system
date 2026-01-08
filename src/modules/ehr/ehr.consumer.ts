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
export class EhrConsumer extends QueueConsumer {
  constructor() {
    super();
  }

  @EventPattern(QUEUES.EHR_SYNC, Transport.RMQ)
  async syncEhr(
    @Payload() data: Intake,
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(`Received message in queue ${QUEUES.EHR_SYNC}:`, data);
    this.ackMessage(ctx);
    await Promise.resolve();
  }
}
