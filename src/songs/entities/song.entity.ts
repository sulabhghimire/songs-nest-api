import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar'})
    title: string

    @Column('varchar', {array: true})
    artists: string[]

    @Column({type:"date"})
    releasedDate: Date

    @Column({type:"time"})
    duration: Date

    @Column({type:"text", nullable: true})
    lyrics?: string;
}