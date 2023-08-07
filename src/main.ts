import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
/**
 *  Security middlewares
 */
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set global prefix;
   */
  app.setGlobalPrefix('api/v1');
  /**
   * Apply Security MiddleWares
   */
  app.use(helmet());
  /**
   *Pipelines para validaciones de Class-Validator
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  /**
   *Configuracion de documentacion con swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Star Wars Movies Api')
    .setDescription('StarWars movie admin api')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      name: 'access_token',
      in: 'header',
    })
    //.addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  /**
   *Asignacion de puerto
   */
  await app.listen(3000);
}
bootstrap();
