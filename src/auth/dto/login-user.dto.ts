import { IsNotEmpty, IsString } from "class-validator";

export class LogInDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    
}