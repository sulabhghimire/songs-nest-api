import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetUser, Public } from 'src/common/decoraters';

@Controller({
    path :'auth',
    version: '1',
})
export class AuthController {

    constructor(private authService:AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('local/login')
    logInLocal(@Body() dto:LogInDto){
       return this.authService.logInLocal(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('logout')
    logOut(@GetUser('sub') userId: number){
        return this.authService.logOut(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refreshTokens(@GetUser('sub') userId: number, @GetUser('refreshToken') refreshToken: string){
        return this.authService.refreshTokens(userId, refreshToken);
    }

}