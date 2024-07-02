import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Pets } from '../pets/entities/pet.entity';
import { PetsModule } from '../pets/pets.module'; // Import PetsService
import { PetsService } from '../pets/pets.service'; // Import PetsService

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Pets]), PetsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
