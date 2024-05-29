import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    idContact: number;

    @Column({ length: 50 })
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;    
}
