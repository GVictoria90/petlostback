import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import {DB_TYPE, HOST, USER_DB_NAME, USER_DB_PASSWORD, PORT, DATABASE_NAME   } from '../config.js'
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'], // Puedes incluir otros archivos .env aquí si es necesario
      isGlobal: true, // Hace que el módulo de configuración esté disponible en toda la aplicación
    }),
// CONFIGURACIONES DE LA CONECCION A LA "BD"
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "161poker",
      port: 3306,
      database: "petlost",
      autoLoadEntities: true, // CARGA LAS ENTITYS DE FORMA AUTOMATICA PARA NO HACERLO MANUAL
      synchronize: true, // TODO CAMBIO QUE SE GENERE ACA, SE SINCRONIZA CON LA "BD"
    }), 
    //
    ServeStaticModule.forRoot({
      rootPath: './uploads',
      serveRoot: '/uploads', // Ruta base para acceder a los archivos
    }),
   
    BreedsModule, UsersModule, AuthModule, PetsModule, PostsModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
