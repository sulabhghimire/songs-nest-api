import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities';
import { createUserDto } from './dto';
import * as argon from 'argon2';
import { UserType } from './constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(dto: createUserDto) {
    const hash = await argon.hash(dto.password);

    const newUser = this.userRepository.create();
    newUser.firstName = dto.firstName;
    newUser.lastName = dto.lastName;
    newUser.password = hash;
    newUser.email = dto.email;
    newUser.role = dto.accountType;

    try {
      const user = await this.userRepository.save(newUser);
      if (dto.accountType === UserType.ARTIST) {
        const artist = this.artistRepository.create();
        artist.user = user;
        await this.artistRepository.save(artist);
      }
      delete user.role;
      delete user.password;
      return user;
    } catch (error) {
        if(error.code === '23505') {
            throw new ConflictException('Email already exists')
        }else throw new InternalServerErrorException();
    }
  }
}
