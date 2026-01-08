import { RmqContext } from '@nestjs/microservices';

export class QueueConsumer {
  protected ackMessage(ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }
}
