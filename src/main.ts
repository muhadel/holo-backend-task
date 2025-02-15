import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');

  app.use(helmet());
  app.use(compression());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  const options = new DocumentBuilder()
    .setTitle('holo-backend-task-svc')
    .setDescription(
      `A voucher pool is a collection of voucher codes that can be used by customers to get discounts on website.
       Each code may only be used once, and we would like to know when it was used by the customer.
       Since there can be many customers in a voucher pool, we need a call that auto-generates voucher codes for each customer.`
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`, 'Local environment')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
}
bootstrap();
