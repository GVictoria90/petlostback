import { User } from "../../users/entities/user.entity";
import { Pets } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { typePostEnum } from "../../common/enums/typePost";

@Entity()
export class Posts {
     @PrimaryGeneratedColumn()
     idPost: number;


     @Column({ type: 'enum', enum: typePostEnum })
     selectedTypePost: typePostEnum;

     @Column()
     title: string;

     @Column()
     content: string;

     @CreateDateColumn({ name: 'created_at' })
     createdAt: Date;
 
     @UpdateDateColumn({ name: 'update_at' })
     updateAt: Date;

     @Column({ default: 1 })
     isActive: number;

     // @Column({ default: () => 'CURRENT_TIMESTAMP' })
     @DeleteDateColumn({ nullable: true })
     softDeleteDate?: Date;

     @ManyToOne(() => User, (user) => user.posting)
     @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser', })
     user: User;

     @Column()
     idUser: number;

     // En la entidad Posts
     @OneToMany(() => Pets, pet => pet.post)
     pets: Pets[];

}