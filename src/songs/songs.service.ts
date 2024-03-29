import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { CreateSongDto, EditSongDto } from './dto';
import { Repository, UpdateResult } from 'typeorm';
import { Song } from './entities';
// import { Connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {

    // constructor(@Inject('CONNECTION') private connection:Connection){
    //     console.log(connection);
    // }

    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>
    ){}

    async create(dto: CreateSongDto):Promise<Song>{
        const song = new Song();
        song.title = dto.title;
        song.artists = dto.artists;
        song.releasedDate = dto.releasedDate;
        song.duration = dto.duration;
        song.lyrics = dto.lyrics;
        return await this.songRepository.save(song)
    }

    findAll():Promise<Song[]>{
        return this.songRepository.find();
    }

    async findOne(id:number):Promise<Song>{
        const song = await this.songRepository.findOneBy({id: id});
        if(!song) throw new NotFoundException("Couldn't find the song with given id.")
        return song;
    }

    async edit(id: number, dto:EditSongDto): Promise<UpdateResult>{
        const song = await this.songRepository.update(id, dto);
        console.log(song);
        if(!song) throw new NotFoundException("Couldn't find the song with given id.");
        return song;
    }

}
