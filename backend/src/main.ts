import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';
import { EnvironmentVariables } from '@config/env/validation';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpValidationPipe } from '@shared/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('SGI')
    .setDescription('The SGI API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api`, app, document);

  app.enableCors();
  // app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  // app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new HttpValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
