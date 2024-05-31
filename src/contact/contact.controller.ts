import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
// Importa los decoradores y excepciones necesarias desde el módulo de NestJS.

import { ContactService } from './contact.service';
// Importa el servicio de contacto que maneja la lógica de negocio.

import { CreateContactDto } from './dto/create-contact.dto';
// Importa el DTO (Data Transfer Object) utilizado para crear nuevos contactos.

import { Auth } from 'src/auth/decorators/auth.decorator';
// Importa el decorador de autenticación personalizado.

import { Role } from 'src/common/enums/role.enum';
// Importa el enumerador de roles que define los diferentes roles de usuario.

@Controller('contact')
// Declara esta clase como un controlador de NestJS y define la ruta base como 'contact'.

export class ContactController {
  constructor(private readonly contactService: ContactService) { }
  // Inyecta el servicio de contacto en el controlador mediante el constructor.

  @Post()
  // Define una ruta POST para crear un nuevo contacto.

  create(@Body() createContactDto: CreateContactDto) {
    // Define el método 'create' que recibe un DTO de creación de contacto en el cuerpo de la solicitud.
    try {
      return this.contactService.create(createContactDto);
      // Intenta crear un nuevo contacto utilizando el servicio de contacto.
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
      // Lanza una excepción interna del servidor si ocurre un error.
    }
  }

  /** SOLO LOS ADMIN PUEDEN LEER LOS MENSAJES */
  @Auth(Role.ADMIN) // Aplica el decorador de autenticación que permite solo a los administradores acceder a esta ruta.
  @Get() // Define una ruta GET para obtener todos los contactos.
  findAll() {   // Define el método 'findAll' para obtener todos los contactos.
  
    try {
      return this.contactService.findAll();
      // Intenta obtener todos los contactos utilizando el servicio de contacto.
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
      // Lanza una excepción interna del servidor si ocurre un error.
    }
  }

  /** SOLO ADMIN */
  @Auth(Role.ADMIN)  // Aplica el decorador de autenticación que permite solo a los administradores acceder a esta ruta.
  @Get(':id')  // Define una ruta GET para obtener un contacto específico por su ID.
 
  findOne(@Param('id') id: number) {
    // Define el método 'findOne' que recibe un ID de contacto como parámetro.
    try {
      return this.contactService.findOne(id);
      // Intenta obtener un contacto específico utilizando el servicio de contacto.
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
      // Lanza una excepción interna del servidor si ocurre un error.
    }
  }

  /** SOLO ADMIN */
  @Auth(Role.ADMIN)  // Aplica el decorador de autenticación que permite solo a los administradores acceder a esta ruta.
  @Delete(':id')  // Define una ruta DELETE para eliminar un contacto específico por su ID.
  remove(@Param('id') id: number) {
    // Define el método 'remove' que recibe un ID de contacto como parámetro.
    try {
      return this.contactService.remove(id);
      // Intenta eliminar un contacto específico utilizando el servicio de contacto.
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
      // Lanza una excepción interna del servidor si ocurre un error.
    }
  }
}
