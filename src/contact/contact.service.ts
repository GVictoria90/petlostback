import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

/** ESTAS CONSULTAS NO NECESITAN AUTENTICACIÓN YA QUE CUALQUIER PERSONA PUEDE ENVIAR UN MENSAJE */
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>
  ) { }
/** INICIO CREATE:  */
/** EN ESTA PARTE SE RECIBEN LOS DATOS Y SE GUARDAN EN LA BD, DE SER TODO EXITOSO
 * RETORNARA UN MENSAJE DE EXITO DE LO CONTRARIO ENVÍA UNA EXCEPCIÓN
 */
  async create(createContactDto: CreateContactDto) {
    try {
      const newMessage = await this.contactRepository.save(createContactDto);

      if (newMessage) {        
        return {
          message: 'Mensaje enviado con éxito', 
        };
      } else {        
        throw new InternalServerErrorException("Falló el envío del mensaje");
      }
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el service");
    }  
  }
/** FIN CREATE */

/** INICIO FINDALL: EN ESTA FUNCION SE REGRESAN TODOS LOS REGISTROS */
  async findAll() {
    try {
      const allMessage = await this.contactRepository.find();

      if (allMessage)
      return allMessage;
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas al consultar la BD");
    }    
  }

 /** FIN FINDALL */ 

 async findOne(id: number) {
    try {
      return await this.contactRepository.findOne({ where: { idContact: id } });
    }  catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el Service");
    }
    
  }
/*
  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }
*/
  async remove(id: number) {
    try {
      const deleteMsg = await this.contactRepository.softDelete(id);
      return {
        message: 'Mensaje borrado con éxito', 
      }; 
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el Service");
    }
   
  }
}
