import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    try {
      return this.contactService.create(createContactDto);
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }
  }
/** SOLO LOS ADMIN PUEDEN LEER LOS MENSAJES */
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    try {
      return this.contactService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }
  }
  /** SOLO ADMIN */
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.contactService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }
  }

  /** SOLO ADMIN */
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.contactService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }
  }
}
