import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, EditSongDto } from './dto';
import { Song } from './entities';

@Controller('songs')
export class SongsController {

    constructor(private songsService:SongsService){}

    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
        return this.songsService.findOne(id);
    }

    @Post('')
    create(@Body() body: CreateSongDto):Promise<Song> {
        return this.songsService.create(body);
    }

    @Patch(':id')
    update(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number, @Body() dto:EditSongDto) {
        return this.songsService.edit(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number) {
        return 'Find All Songs'
    }

}
