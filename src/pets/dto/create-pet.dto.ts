import { IsString, MinLength, IsInt, IsPositive, IsOptional, IsEnum, IsNumber } from "class-validator";
import { PetEnum } from "../../common/enums/pet.enum";
import { Transform } from "class-transformer";

export class CreatePetDto {
    @IsString() // debe ser string
    @MinLength(3) //el minimo de caracteres admitidos
    namePet: string;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsInt() // ES NUMERO ENTERO
    @IsPositive() // SEA POSITIVO
    @IsNumber()
    age: number;

    @IsString()
    @IsOptional() // es opcional
    breed?: string;

    @IsEnum(PetEnum) // Valida que el valor sea uno de los miembros del enum
    @IsOptional()
    pet?: PetEnum;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    @IsNumber()
    @IsOptional()
    idPost: number;
}
