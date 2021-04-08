import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module'; 
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('DBLab')
  .setDescription('DB Lab #2')
  .setVersion('1.0')
  .addTag('database')
  .addBearerAuth(
    { type: 'http', in: 'header', scheme: 'bearer', bearerFormat: 'JWT' },
    'JWT',
  )
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
 }
 bootstrap();