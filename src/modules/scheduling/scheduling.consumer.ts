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
export class SchedulingConsumer extends QueueConsumer {
  constructor(private readonly intakeService: IntakeService) {
    super();
  }

  @EventPattern(QUEUES.SCHEDULING_CREATE_APPOINTMENT, Transport.RMQ)
  async createAppointment(
    @Payload() data: Intake,
    @Ctx() ctx: RmqContext,
  ): Promise<void> {
    console.log(
      `Received message in queue ${QUEUES.SCHEDULING_CREATE_APPOINTMENT}:`,
      data,
    );

    const status =
      Math.random() < 0.5
        ? DownstreamStatusEnum.COMPLETED
        : DownstreamStatusEnum.FAILED;

    await this.intakeService.updateDownstreanStatus(
      data.id,
      status,
      'scheduling',
    );

    this.ackMessage(ctx);
  }
}
