import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto';

@Controller({
    path :'auth',
    version: '1',
})
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('local/login')
    logInLocal(@Body() dto:LogInDto){
       return this.authService.logInLocal(dto);
    }

    @Post('logout')
    logOut(){
        this.authService.logOut();
    }

    @Post('refresh')
    refreshTokens(){
        this.authService.refreshTokens();
    }

}