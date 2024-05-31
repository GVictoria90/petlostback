import { IsString, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

// Define una clase DTO (Data Transfer Object) para crear un contacto
export class CreateContactDto {
    
    @Column() // Define una columna de la tabla en la base de datos
    @IsString()  // Valida que el valor de la propiedad sea una cadena de texto
    @MinLength(5) // Valida que la longitud mínima de la cadena sea de 5 caracteres
    @MaxLength(20)  // Valida que la longitud máxima de la cadena sea de 20 caracteres
    name: string;  // Define una propiedad 'name' que será utilizada para almacenar el nombre del contacto

    @Column()   // Define una columna de la tabla en la base de datos
    @IsString() // Valida que el valor de la propiedad sea una cadena de texto
    email: string; // Define una propiedad 'email' que será utilizada para almacenar el correo electrónico del contacto

    @Column()  // Define una columna de la tabla en la base de datos
    @IsString()  // Valida que el valor de la propiedad sea una cadena de texto
    @MinLength(30) // Valida que la longitud mínima de la cadena sea de 30 caracteres
    @MaxLength(300) // Valida que la longitud máxima de la cadena sea de 300 caracteres
    message: string;   // Define una propiedad 'message' que será utilizada para almacenar el mensaje del contacto
}
/**
 * Imports:

IsString, MaxLength, MinLength son decoradores de la biblioteca class-validator, 
usados para validar propiedades de clase.
Column es un decorador de typeorm, 
usado para definir columnas de una entidad en la base de datos.

Clase CreateContactDto:
Esta clase representa un objeto de transferencia de datos (DTO) para crear un contacto. 
Los DTOs se utilizan para transferir datos entre capas de una aplicación.

Propiedades de la Clase:
name: Representa el nombre del contacto. Está decorada con validadores para asegurar
    que es una cadena de texto y que su longitud está entre 5 y 20 caracteres.
email: Representa el correo electrónico del contacto. Está decorada con un validador 
    para asegurar que es una cadena de texto.
message: Representa el mensaje del contacto. Está decorada con validadores para asegurar 
    que es una cadena de texto y que su longitud está entre 30 y 300 caracteres.
 */