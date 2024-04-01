import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserType } from "../constants";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    firstName: string

    @Column('varchar')
    lastName: string

    @Column('varchar', {unique: true})
    email: string

    @Column('varchar')
    password: string

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.REGULAR
    })
    role : UserType

    @Column({nullable: true, default: null, type:'varchar'})
    hash: string

    @CreateDateColumn({name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt: Date;
}