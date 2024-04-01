import { Artist } from "src/artists/entities";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('songs')
export class Song{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar'})
    title: string;

    // @Column('varchar', {array: true})
    // artists: string[]

    @ManyToMany(()=>Artist, (artist)=> artist.songs, {cascade: true})
    @JoinTable({name: 'songs_artists'})
    artists: Artist[];

    @Column({type:"date"})
    releasedDate: Date;

    @Column({type:"time"})
    duration: Date;

    @Column({type:"text", nullable: true})
    lyrics?: string;

    @CreateDateColumn({name:'createdAt'}) createdAt:Date;
    
    @UpdateDateColumn({name:'updatedAt'}) updatedAt: Date;
}