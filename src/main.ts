import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';

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

  const port = process.env.PORT ?? 3000;
  await app.listen(port).then(() => {
    console.log(`Server running at port ${port} ...`);
    console.log(`API Docs: http://localhost:${port}/docs`);
  });
}
void bootstrap();
