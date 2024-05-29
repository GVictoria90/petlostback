import { IsString, MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreateContactDto {

    @Column()
    @IsString()
    @MinLength(5)
    name: string;

    @Column()
    @IsString()
    email: string;

    @Column()
    @IsString()
    @MinLength(30)
    message: string; 
}
