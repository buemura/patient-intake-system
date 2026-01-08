import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './modules/app.module';
import { RmqSettings } from './shared/queue/queue';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Patient Intake API')
    .setDescription('Patient Intake API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);
}

function setupMiddlewares(app: INestApplication) {
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupMiddlewares(app);
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('serverPort');

  // Create RabbitMQ Microservice
  const rabbitMqHost = configService.getOrThrow<string>(
    'messaging.rabbitmq.host',
  );

  for (const rmq of RmqSettings) {
    const queueName = rmq.options?.['queue'] ?? 'unknown';
    console.log(`---> ${queueName} started `);
    app.connectMicroservice<MicroserviceOptions>({
      ...rmq,
      transport: Transport.RMQ,
      options: { ...rmq.options, urls: [rabbitMqHost] },
    });
  }
  await app.startAllMicroservices();

  await app.listen(port).then(() => {
    console.log(`Server running at port ${port} ...`);
    console.log(`RabbitMQ connected to broker: ${rabbitMqHost}`);
    console.log(`API Docs: http://localhost:${port}/docs`);
  });
}
void bootstrap();
