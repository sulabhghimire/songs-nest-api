import { Transform, plainToInstance } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty,  IsPositive, IsString, validateSync } from "class-validator";
import { ENVIRONMENT } from "../enums";

class EnvironmentVariables {
    @IsEnum(ENVIRONMENT)
    @IsNotEmpty()
    NODE_ENV : ENVIRONMENT

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Transform(({value}) => parseInt(value, 10))
    PORT : number;

    @IsString()
    @IsNotEmpty()
    DATABASE_SERVER: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Transform(({value}) => parseInt(value, 10))
    DATABASE_PORT: number;

    @IsString()
    @IsNotEmpty()
    DATABASE_USERNAME: string;

    @IsString()
    @IsNotEmpty()
    DATABASE_USER_PASS: string;
    
    @IsString()
    @IsNotEmpty()
    DATABASE_NAME: string;

    @IsString()
    @IsNotEmpty()
    ACCESS_TOKEN_SECRET: string

    @IsString()
    @IsNotEmpty()
    REFRESH_TOKEN_SECRET: string
}

export function validate(config: Record<string, unknown>){

    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        {enableImplicitConversion: true},
    );

    const errors = validateSync(validatedConfig, {skipMissingProperties: false});
    
    if(errors.length > 0) throw new Error(errors.toString());
    return validatedConfig;
}