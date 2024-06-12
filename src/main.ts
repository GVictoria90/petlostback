import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

 // const app = await NestFactory.create(AppModule);
 const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // PREFIJO DE LA URL QUE SIEMPRE VA ESTAR AHI
  app.setGlobalPrefix("api/v1");

  // ESTO HACE LAS VALIDACIONES DE FORMAR GLOBAL LOS DATOS DE ENTRADA
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // admite lo de la lista blanca que son los DTO 
      forbidNonWhitelisted: true, // envia eror al cliente si envia otra cosa
      transform: true, // TRANSFORMA AUTOMATICAMENTE LOS DATOS, 
      // CUANDO PUEDE DE NUMBER A STRING O VICE VERSA SEGUN EL "DTO"
    })
  );

  // Configuración para servir archivos estáticos las fotos
  app.useStaticAssets(join(__dirname, '..', 'dist', 'uploads'), {
    prefix: '/uploads/',
  });
  
  app.enableCors({
    origin: '*', // Cambia '*' por el dominio específico que deseas permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Pets Lost & Found example")
    .setDescription("descripción de la app")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // PUERTO 
  await app.listen(3006);
}
bootstrap();
