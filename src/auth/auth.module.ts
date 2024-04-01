import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { JwtModule } from '@nestjs/jwt';
import { AtJwtStrategy, RtJwtStrategy } from './strategies';

@Module({
  imports:[TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtJwtStrategy, RtJwtStrategy]
})
export class AuthModule {}
