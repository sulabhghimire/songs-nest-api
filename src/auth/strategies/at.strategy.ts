import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AtPayload } from "../types";
import { User } from "src/users/entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:'at-secret',
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