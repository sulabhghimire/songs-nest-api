import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Request} from 'express';
import { RtPayload } from "../types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(
        config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get<string>('ACCESS_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload:RtPayload){
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        };
    }
}