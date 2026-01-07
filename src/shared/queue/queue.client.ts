export const QUEUE_SERVICE = Symbol('IQueueService');

export interface QUEUE_SERVICE {
  publish<T>(channel: string, message: T): Promise<void> | void;
}
