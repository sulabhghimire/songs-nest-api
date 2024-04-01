import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities';
import { Artist } from 'src/artists/entities';

@Module({
  imports:[TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService, // Standard Format
    // {
    //   provide: SongsService,    // Use Class Format
    //   useClass: SongsService,
    // }
    // {                          // Value Based Providers can be used to inject values, mocking services and so on
    //   provide: 'CONNECTION',
    //   useValue: connection
    // }
  ]
})
export class SongsModule {}
