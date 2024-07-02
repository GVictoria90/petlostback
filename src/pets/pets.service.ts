import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BreedsService } from 'src/breeds/breeds.service';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pets } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) 
    private readonly petRepository: Repository<Pets>, 
    @InjectRepository(Breed) 
    private readonly breedRepository: Repository<Breed>, 
    private readonly breedService: BreedsService) { }  

  /** +++++++++++++++ CREATE INICIO +++++++++++++++ */

  async create(createPetDto: CreatePetDto, file: Express.Multer.File, user: UserActiveInterface) {
    try {
      const breed = await this.breedService.validateBreed(createPetDto.breed);
      const insertPet = await this.petRepository.save({
        ...createPetDto,
        breed: breed,
        idUser: user.idUser,
        image: file?.filename // Guarda el nombre del archivo en la BD si existe
      });

      if (insertPet) {
        return { 
          message: 'Mascota creada con exito',
          idPet: insertPet.idPet,
         };
      } else {
        throw new InternalServerErrorException("Error when creating the pet");
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, "Error when calling the database");
    }
  }
  /*
  async create(createPetDto: CreatePetDto, user: UserActiveInterface) {
    try {
      const breed = await this.breedService.validateBreed(createPetDto.breed);
      const insertPet = await this.petRepository.save({
        ...createPetDto,
        breed: breed,
        idUser: user.idUser,
        
      });

      if (insertPet) {
        return { message: 'successfully created pet' };
      } else {
        throw new InternalServerErrorException('Error when creating the pet');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'Error when calling the database');
    }
  }*/

/**
 *   async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create(createPetDto);
    return this.petRepository.save(pet);
  }
 */

  /** +++++++++++++++ CREATE FIN +++++++++++++++ */

  /** --------------- INICIO FINDALL ---------------------- */
  async findAll(userId: number, user: UserActiveInterface) { 
    try {      
     /* if (user && user.role === Role.ADMIN) { 
        return await this.petRepository.find(); 
      }
      else if (user && user.role === Role.USER) { */
        return await this.petRepository.find({ 
          where: { idUser: userId }
        });
     // }
      //return await this.petRepository.find({ where: { isActive: 1 } }); 
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING LIST THE BREED'); 
    } 
  }

  /** --------------- FIN FINDALL ---------------------- */

  async findOne(id: number) { // Método para buscar una mascota por su ID
    try {
      return await this.petRepository.findOne({ where: { idPet: id } }); // Busca la mascota por su ID y la devuelve
    } catch (error) {
      throw new InternalServerErrorException("DB query failed"); // Lanza una excepción si falla la consulta
    }
  }

  /** +++++++++++++++ UPDATE INICIO +++++++++++++++ */
  async update(id: number, updatePetDto: UpdatePetDto) { 
    try {
      const updatePet = await this.petRepository.update(id, updatePetDto); 
      if (updatePet) {
        return { message: 'Pet updated successfully' }; 
      } else {
        return { message: 'Ha ocurrido un error al intentar actualizar la mascota' }; 
      }
    } catch (error) {
      throw new InternalServerErrorException("DB query failed"); 
    }
  }
  /** +++++++++++++++ UPDATE FIN +++++++++++++++ */

  /** +++++++++++++++ REMOVE AND RESTORE INICIO +++++++++++++++ */
  async softDelete(id: number) { // Método para realizar un borrado lógico de una mascota
    try {
      const petActive = await this.findOne(id); // Busca la mascota por su ID
      if (!petActive) {
        throw new NotFoundException('Pet not found'); // Lanza una excepción si la mascota no se encuentra
      }

      if (petActive.isActive == 1) { // Si la mascota está activa
        petActive.isActive = 0; // La desactiva
      }
      else {
        petActive.isActive = 1; // Si no está activa, la activa
      }
      await this.petRepository.save(petActive); // Guarda los cambios en la base de datos
    } catch (error) {
      throw new BadRequestException(error, 'QUERY FAILED WHEN TRYING TO DELETE THE PET'); // Lanza una excepción si falla la consulta
    }
  }
  /** +++++++++++++++ REMOVE AND RESTORE FIN +++++++++++++++ */

  async deleteAllByPostId(idPost: number): Promise<void> {
    try {
      // Use createQueryBuilder to find all pets related to the post
      const pets = await this.petRepository.createQueryBuilder('pet')
       .where('pet.idPost = :idPost', { idPost }) // Specify the condition
       .getMany(); // Fetch all matching records
  
       for (const pet of pets) {
        // Assuming you want to set pets to inactive
        pet.isActive = 0; // Assign 0 instead of false
        pet.softDeleteDate = new Date();
        await this.petRepository.save(pet);
      }
      
    } catch (error) {
      throw new BadRequestException(error.message, 'Failed to delete pets related to the post');
    }
  }
  
}
