import { Injectable } from '@nestjs/common';

import { QUEUE_SERVICE } from './queue.client';

@Injectable()
export class QueueService implements QUEUE_SERVICE {
  publish<T>(channel: string, message: T): void {
    // Implementation for publishing a message to the specified channel
    console.log(`Publishing message to channel ${channel}:`, message);
    // Here you would add the actual logic to publish to a message queue
  }
}
