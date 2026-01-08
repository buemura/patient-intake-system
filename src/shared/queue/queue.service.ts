import { Injectable } from '@nestjs/common';
import { Channel, ChannelModel, connect, Options } from 'amqplib';

export const QUEUE_SERVICE = 'QUEUE_SERVICE';

export interface IQueueService {
  publishMessage<T>(exchange: string, routingKey: string, message: T): void;
}

type QueueDef = {
  url: string;
  queueName: string;
  routingKeys?: string[];
  queueOptions?: Options.AssertQueue;
  // optional: dlqName?: string;
};

@Injectable()
export class QueueService implements IQueueService {
  private connection: ChannelModel;
  private channel: Channel;

  async connect(url: string) {
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
  }

  async assertExchange(
    name: string,
    type: 'topic' | 'direct' | 'fanout' = 'topic',
  ) {
    await this.channel.assertExchange(name, type, { durable: true });
  }

  async assertAndBindQueue(
    queue: string,
    exchange: string,
    routingKeys: string[] = ['#'], // default: catch-all
    options?: Options.AssertQueue,
  ) {
    await this.channel.assertQueue(queue, {
      durable: true,
      ...(options ?? {}),
    });

    for (const key of routingKeys) {
      await this.channel.bindQueue(queue, exchange, key);
      console.log(`[AMQP] Bound queue "${queue}" → ${exchange}:${key}`);
    }
  }

  async setupBindings(exchange: string, queues: QueueDef[]) {
    await this.assertExchange(exchange, 'topic');

    for (const q of queues) {
      await this.assertAndBindQueue(
        q.queueName,
        exchange,
        q.routingKeys ?? ['#'],
        q.queueOptions,
      );
    }
  }

  publishMessage<T>(exchange: string, routingKey: string, message: T) {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
    console.log('[PRODUCER] ::', { exchange, routingKey, message });
  }
}
