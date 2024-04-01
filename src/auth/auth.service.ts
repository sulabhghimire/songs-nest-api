import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { Repository } from 'typeorm';
import { LogInDto } from './dto';
import { Tokens } from './types';
import { UserType } from 'src/users/constants';
import * as argon from 'argon2'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwt: JwtService
    ){}


    async logInLocal(dto:LogInDto):Promise<Tokens>{
        const user = await this.userRepository.findOneBy({
            email: dto.email
        });

        if(!user) throw new UnauthorizedException('Incorrect Credentials');

        const pwMatches = await argon.verify(user.password, dto.password);

        if(!pwMatches) throw new UnauthorizedException('Incorrect Credentials');

        const tokens = await this.getTokens(user.id, dto.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: number, refresh_token: string){
        const hash = await argon.hash(refresh_token);
        await this.userRepository.update({id:userId}, {hash : hash})
    }

    logOut(){

    }

    refreshTokens(){
    
    }


    async getTokens(userId: number,  email: string, role: UserType):Promise<Tokens>{

        const [at, rt] = await Promise.all([
            this.jwt.signAsync({sub: userId, email: email, role: role}, {expiresIn: 60 * 15, secret: 'at-secret'}),
            this.jwt.signAsync({sub: userId}, {secret:'rt-secret', expiresIn: 60 * 60 * 24 *7})
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    }
}
