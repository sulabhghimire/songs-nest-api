import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto';

@Controller({
    path:'users',
    version: '1'
})
export class UsersController {

    constructor(private userService: UsersService){}

    @Get('me')
    getMe() {
        return 'Get Me';
    }

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

    @Patch(':id')
    updateUser(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number
    ){
        return `Update user with id ${id}`

    }

    @Delete(':id')
    deleteUser(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number
    ){
        return `Delete user with id ${id}`

    }

}
