import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    try {
      return this.contactService.create(createContactDto);
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }
  
  }

  @Get()
  findAll() {
    try {
      return this.contactService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, "Problemas en el controller");
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.contactService.findOne(+id);
    } catch (error) {
      
    }
    
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }
*/
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
