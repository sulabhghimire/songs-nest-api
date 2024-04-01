import { ArrayMinSize, IsArray, IsDateString, IsInt, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsInt({each: true})
    @ArrayMinSize(1)
    readonly artists;

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;

    @IsOptional()
    @IsString()
    readonly lyrics?: string;

}