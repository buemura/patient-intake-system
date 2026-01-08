import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EVENTS_EXCHANGE, queues } from './queue';
import { QUEUE_SERVICE, QueueService } from './queue.service';

@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: QUEUE_SERVICE,
      useFactory: async (configService: ConfigService) => {
        const rabbit = new QueueService();

        const url =
          queues[0]?.url ??
          configService.getOrThrow<string>('messaging.rabbitmq.host');

        await rabbit.connect(url);
        await rabbit.setupBindings(EVENTS_EXCHANGE, queues);
        return rabbit;
      },
    },
  ],
  exports: [QUEUE_SERVICE],
})
export class QueueModule {}
