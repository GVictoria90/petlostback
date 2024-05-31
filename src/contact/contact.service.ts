import { Injectable, InternalServerErrorException } from '@nestjs/common'; // Importa decorador Injectable y excepción InternalServerErrorException de @nestjs/common
import { CreateContactDto } from './dto/create-contact.dto'; // Importa el DTO CreateContactDto desde su ruta correspondiente
import { InjectRepository } from '@nestjs/typeorm'; // Importa el decorador InjectRepository de @nestjs/typeorm
import { Contact } from './entities/contact.entity'; // Importa la entidad Contact desde su ruta correspondiente
import { Repository } from 'typeorm'; // Importa la clase Repository de typeorm

/** ESTAS CONSULTAS NO NECESITAN AUTENTICACIÓN YA QUE CUALQUIER PERSONA PUEDE ENVIAR UN MENSAJE */
@Injectable() // Indica que esta clase es un proveedor inyectable
export class ContactService {
  constructor(
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact> // Inyecta el repositorio de Contact
  ) { }

  /** INICIO CREATE:  */
  /** EN ESTA PARTE SE RECIBEN LOS DATOS Y SE GUARDAN EN LA BD, DE SER TODO EXITOSO
   * RETORNARA UN MENSAJE DE EXITO DE LO CONTRARIO ENVÍA UNA EXCEPCIÓN
   */
  async create(createContactDto: CreateContactDto) {
    try {
      const newMessage = await this.contactRepository.save(createContactDto); // Guarda el nuevo contacto en la base de datos

      if (newMessage) {        
        return {
          message: 'Mensaje enviado con éxito', // Retorna mensaje de éxito si se guarda correctamente
        };
      } else {        
        throw new InternalServerErrorException("Falló el envío del mensaje"); // Lanza una excepción si no se pudo guardar
      }
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el service"); // Lanza una excepción en caso de error durante la operación
    }  
  }
  /** FIN CREATE */

  /** INICIO FINDALL: EN ESTA FUNCION SE REGRESAN TODOS LOS REGISTROS */
  async findAll() {
    try {
      const allMessage = await this.contactRepository.find(); // Busca y retorna todos los contactos

      if (allMessage)
        return allMessage; // Retorna todos los contactos si se encuentran
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas al consultar la BD"); // Lanza una excepción en caso de error durante la consulta
    }    
  }
  /** FIN FINDALL */ 

  async findOne(id: number) {
    try {
      return await this.contactRepository.findOne({ where: { idContact: id } }); // Busca y retorna un contacto por su ID
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el Service"); // Lanza una excepción en caso de error durante la consulta
    }
  }

  async remove(id: number) {
    try {
      const deleteMsg = await this.contactRepository.softDelete(id); // Realiza un borrado suave del contacto por su ID
      if(deleteMsg){     
         return {
        message: 'Mensaje borrado con éxito', // Retorna mensaje de éxito si se borra correctamente
      };
    }else{
      throw new InternalServerErrorException("Problemas en el Service"); // Lanza una excepción en caso de error durante la operación
    }
 
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el Service"); // Lanza una excepción en caso de error durante la operación
    }
  }
}
/**
 * Explicación General:
Imports: Importa módulos y clases necesarias para la funcionalidad del servicio.
Clase ContactService: Define un servicio que maneja operaciones CRUD para la entidad Contact.
Constructor: Inyecta el repositorio de la entidad Contact.
create: Método para crear y guardar un nuevo contacto en la base de datos.
findAll: Método para recuperar todos los contactos de la base de datos.
findOne: Método para recuperar un contacto específico por su ID.
remove: Método para realizar un borrado suave de un contacto por su ID.
Cada método maneja errores utilizando InternalServerErrorException para proporcionar
 información clara en caso de fallos.
 */