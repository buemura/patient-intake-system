import { Module } from '@nestjs/common';

import { QUEUE_SERVICE } from './queue.client';
import { QueueService } from './queue.service';

@Module({
  providers: [
    {
      provide: QUEUE_SERVICE,
      useClass: QueueService,
    },
  ],
  exports: [QUEUE_SERVICE],
})
export class QueueModule {}
