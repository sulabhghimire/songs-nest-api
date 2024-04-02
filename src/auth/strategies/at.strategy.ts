import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AtPayload } from "../types";
import { User } from "src/users/entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
        });
    }

    async validate(payload:AtPayload){

        const { sub , email} = payload;
        const user = await this.userRepository.findOneBy({id: sub, email: email});
        
        if(!user) throw new UnauthorizedException('Invalid Credentials');
        else {
            delete user.createdAt;
            delete user.hash;
            delete user.password;
            delete user.updatedAt;

            return {
                ...payload,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            };
        }

    }
}