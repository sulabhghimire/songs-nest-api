import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { CreateSongDto, EditSongDto, PageDto, PageMetaDto } from './dto';
import { Repository, UpdateResult } from 'typeorm';
import { Song } from './entities';
import { QueryOptionsDto } from './dto/query-options.dto';
import { Artist } from 'src/artists/entities';
// import { Connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {

    // constructor(@Inject('CONNECTION') private connection:Connection){
    //     console.log(connection);
    // }

    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ){}

    async create(dto: CreateSongDto):Promise<Song>{
        const song = new Song();
        song.title = dto.title;
        song.releasedDate = dto.releasedDate;
        song.duration = dto.duration;
        song.lyrics = dto.lyrics;

        const artists = await this.artistRepository.find(
            {where 
                : {
            id: dto.artists
        }
        });
        song.artists = artists;

        return await this.songRepository.save(song);
    }

    async findAll(queryOptionsDto: QueryOptionsDto):Promise<PageDto<Song>>{
        const queryBuilder = this.songRepository.createQueryBuilder('songs');

        // console.log(queryOptionsDto.skip, queryOptionsDto.limit, queryOptionsDto.search)
        // if(queryOptionsDto.search) queryBuilder.where("LOWER(title) = LOWER(:title)", {title : queryOptionsDto.search});

        queryBuilder
            .orderBy('songs.createdAt', queryOptionsDto.order)
            .skip((queryOptionsDto.page - 1) * queryOptionsDto.limit)
            .take(queryOptionsDto.limit)
        
        const itemCount =  await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({itemCount, queryOptionsDto});

        return new PageDto(entities, pageMetaDto);

    }

    async findOne(id:number):Promise<Song>{
        const song = await this.songRepository.findOneBy({id: id});
        if(!song) throw new NotFoundException("Couldn't find the song with given id.")
        return song;
    }

    async edit(id: number, dto:EditSongDto): Promise<Song>{
        const existingSong = await this.songRepository.findOneBy({id});
        if(!existingSong) throw new NotFoundException(`Song with id:${id} not found.`);
        const newSong = this.songRepository.merge(existingSong, dto);
        return await this.songRepository.save(newSong);
    }

    async delete(id: number) {
        const existingSong = await this.songRepository.findOneBy({id});
        if(!existingSong) throw new NotFoundException(`Song with id:${id} not found.`);
        await this.songRepository.delete({id})
        return;
    }

    async paginate(options:any) {
        const qb = this.songRepository.createQueryBuilder('q');

    }

}
