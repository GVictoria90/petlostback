import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    idContact: number;

    
}
