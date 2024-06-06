import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { typePostEnum } from "../../common/enums/typePost";
import { PetEnum } from "src/common/enums/pet.enum";

export class CreatePostDto {    
    


    @IsEnum(PetEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    typePost?: typePostEnum;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;
}