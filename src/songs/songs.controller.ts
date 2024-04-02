import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, EditSongDto } from './dto';
import { Song } from './entities';
import { QueryOptionsDto } from './dto/query-options.dto';
import { GetUser, Roles } from 'src/common/decoraters';
import { UserType } from 'src/users/constants';

@Controller('songs')
export class SongsController {

    constructor(private songsService:SongsService){}

    @Get()
    findAll(
    @Query() queryOptionsDto : QueryOptionsDto){
        return this.songsService.findAll(queryOptionsDto);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
        return this.songsService.findOne(id);
    }

    @Roles(UserType.ARTIST)
    @Post('')
    create(
        @GetUser('sub') userId: number,
        @Body() body: CreateSongDto):Promise<Song> {
        return this.songsService.create(body);
    }

    @Roles(UserType.ARTIST)
    @Patch(':id')
    update(
        @GetUser('sub') userId: number,
        @Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number, @Body() dto:EditSongDto) {
        return this.songsService.edit(id, dto);
    }

    @Roles(UserType.ADMIN, UserType.ARTIST)
    @Delete(':id')
    delete(
        @GetUser('sub') userId: number,
        @Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
        return this.songsService.delete(id);
    }

}
