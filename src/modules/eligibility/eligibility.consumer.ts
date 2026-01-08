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
import { DownstreamStatusEnum } from '../intake/intake.enum';
import { IntakeService } from '../intake/intake.service';

@Controller()
export class EligibilityConsumer extends QueueConsumer {
  constructor(private readonly intakeService: IntakeService) {
    super();
  }

  @EventPattern(QUEUES.ELIGIBILITY_CHECK, Transport.RMQ)
  async checkEligibility(
    @Payload() data: Intake,
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(`Received message in queue ${QUEUES.ELIGIBILITY_CHECK}:`, data);

    const status =
      Math.random() < 0.5
        ? DownstreamStatusEnum.COMPLETED
        : DownstreamStatusEnum.FAILED;

    await this.intakeService.updateDownstreanStatus(
      data.id,
      status,
      'eligibility',
    );

    this.ackMessage(ctx);
  }
}
