import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Request} from 'express';
import { RtPayload } from "../types";

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'rt-secret',
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