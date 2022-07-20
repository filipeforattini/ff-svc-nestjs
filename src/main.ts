import { NestFactory } from '@nestjs/core';
import { RedocModule } from 'nestjs-redoc';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const { PORT = 8080 } = process.env;

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await RedocModule.setup('/redoc', app, document, {});
  await app.listen(PORT);
}

bootstrap();
