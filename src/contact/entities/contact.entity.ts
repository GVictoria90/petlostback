// Importa las decoraciones `MaxLength` y `MinLength` del paquete `class-validator`
// Estas se utilizan para validar la longitud de los campos de la entidad.
import { IsEmail, MaxLength, MinLength } from "class-validator";

// Importa las decoraciones de `typeorm` necesarias para definir la entidad y sus columnas.
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// Define la clase `Contact` como una entidad de la base de datos usando la decoración `@Entity`.
@Entity()
export class Contact {

    // Define la columna `idContact` como la clave primaria de la tabla,
    // generada automáticamente con un valor único.
    @PrimaryGeneratedColumn()
    idContact: number;

    // Define la columna `name` como un campo de la tabla.
    // La longitud mínima del campo `name` es de 5 caracteres y la máxima es de 20 caracteres.
    @Column()
    @MinLength(5)
    @MaxLength(20)
    name: string;

    // Define la columna `email` como un campo de la tabla.
    @Column()
    @IsEmail()
    email: string;

    // Define la columna `message` como un campo de la tabla.
    @Column()
    @MinLength(10) // Valida que la longitud mínima de la cadena sea de 30 caracteres
    @MaxLength(300) // Valida que la longitud máxima de la cadena sea de 300 caracteres
    messageSend: string;    

    // Define la columna `deletedAt` para almacenar la fecha de eliminación lógica.
    // Se utiliza `@DeleteDateColumn` para manejar la eliminación lógica de registros.
    @DeleteDateColumn()
    deletedAt: Date;

    // Define la columna `createdAt` para almacenar la fecha de creación del registro.
    // Se utiliza `@CreateDateColumn` para establecer automáticamente la fecha y hora de creación.
    @CreateDateColumn()
    createdAt: Date;
}

