import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto';
import { GetUser, Public, Roles } from 'src/common/decoraters';
import { UserType } from './constants';

@Controller({
    path:'users',
    version: '1'
})
export class UsersController {

    constructor(private userService: UsersService){}

    @Get('me')
    getMe(
        @GetUser('sub') userId: number
    ) {
        return 'Get Me';
    }

    @Public()
    @Post('signup')
    create(
        @Body() createUserDto: createUserDto
    ){
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    getUser(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number
    ) {
        return `Information for user with id ${id}`
    }

    @Patch('')
    updateUser(
        @GetUser('sub') userId: number
    ){
        return `Update user with id ${userId}`

    }

    @Delete(':id')
    deleteUser(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number
    ){
        return `Delete user with id ${id}`

    }

}
