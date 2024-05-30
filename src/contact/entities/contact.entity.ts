import { MinLength, maxLength } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    idContact: number;

    @Column()
    @MinLength(5)
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;    

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
