import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Artist } from 'src/artists/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Artist])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
