import { Song } from "src/songs/entities";
import { User } from "src/users/entities";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('artists')
export class Artist {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(()=> Song, (song) => song.artists)
    songs: Song[]

}