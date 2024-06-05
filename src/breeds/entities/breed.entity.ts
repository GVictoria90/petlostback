import { Pets } from "src/pets/entities/pet.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({ primary: true, generated: true})
    idBreed: number;

    @Column({ length: 50})
    nameBreed: string;

    @Column({ default: 1 })
    isActive: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) 
    softDeleteDate: Date;
    
    @OneToMany(() => Pets, (pet) => pet.breed)
    pets: Pets[];

}