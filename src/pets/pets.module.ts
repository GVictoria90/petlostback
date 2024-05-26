import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './entities/pet.entity';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Pets]), 
  MulterModule.register({
    dest: './uploads', // carpeta donde se guardarán los archivos
  }),
  BreedsModule],
  controllers: [PetsController],
  providers: [PetsService, BreedsService],
})
export class PetsModule {}
