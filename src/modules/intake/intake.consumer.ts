import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import { EVENT } from '@/shared/queue/queue';
import { QueueConsumer } from '@/shared/queue/queue.consumer';
import { IntakeService } from './intake.service';

@Controller()
export class IntakeConsumer extends QueueConsumer {
  constructor(private readonly intakeService: IntakeService) {
    super();
  }

  @EventPattern(EVENT.INTAKE_SUBMITTED, Transport.RMQ)
  async validateIntakeAnswer(
    @Payload() data: { intakeId: string },
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(
      `Received message in Routing Key ${EVENT.INTAKE_SUBMITTED}:`,
      data,
    );

    await this.intakeService.processIntakeAnswer(data.intakeId);
    this.ackMessage(ctx);
  }
}
