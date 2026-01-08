import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const EVENTS_EXCHANGE = 'app.events';

export const EVENT = {
  INTAKE_SUBMITTED: 'intake.submitted',
  INTAKE_COMPLETED: 'intake.completed',
};

export const QUEUES = {
  ELIGIBILITY_CHECK: 'eligibility.check',
  SCHEDULE_CREATE_APPOIINTMENT: 'schedule.create.appointment',
  BILLING_CREATE: 'billing.create',
  EHR_SYNC: 'ehr.sync',
};

export const queues = [
  {
    url: process.env.RABBITMQ_URL!,
    queueName: EVENT.INTAKE_SUBMITTED,
    routingKeys: [EVENT.INTAKE_SUBMITTED],
  },
  {
    url: process.env.RABBITMQ_URL!,
    queueName: QUEUES.ELIGIBILITY_CHECK,
    routingKeys: [EVENT.INTAKE_COMPLETED],
  },
  {
    url: process.env.RABBITMQ_URL!,
    queueName: QUEUES.SCHEDULE_CREATE_APPOIINTMENT,
    routingKeys: [EVENT.INTAKE_COMPLETED],
  },
  {
    url: process.env.RABBITMQ_URL!,
    queueName: QUEUES.BILLING_CREATE,
    routingKeys: [EVENT.INTAKE_COMPLETED],
  },
  {
    url: process.env.RABBITMQ_URL!,
    queueName: QUEUES.EHR_SYNC,
    routingKeys: [EVENT.INTAKE_COMPLETED],
  },
];

interface IQueueListener {
  url: string;
  queueName: string;
  prefetchCount?: number;
}

function buildListeners(
  queueListener: IQueueListener[],
): Array<MicroserviceOptions> {
  return queueListener.map((queue: IQueueListener) => {
    const listener: MicroserviceOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [queue.url],
        queue: queue.queueName,
        queueOptions: { durable: true },
        noAck: false,
        prefetchCount: 10,
        deserializer: {
          deserialize(message: any) {
            // message is the amqplib delivery { content, fields, properties, ... }
            const raw =
              message?.content instanceof Buffer
                ? message.content.toString()
                : (message?.content ?? message);

            let parsed: any;
            try {
              parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            } catch {
              parsed = raw;
            }

            // If publisher already sent a Nest packet, pass it through
            if (
              parsed &&
              typeof parsed === 'object' &&
              'pattern' in parsed &&
              'data' in parsed
            ) {
              return parsed;
            }

            // Otherwise, force pattern to the queue name and data to parsed payload
            return {
              pattern: queue.queueName, // <-- string pattern expected by @EventPattern
              data: parsed,
            };
          },
        },
      },
    };

    return listener;
  });
}

export const RmqSettings: Array<MicroserviceOptions> = buildListeners(queues);
