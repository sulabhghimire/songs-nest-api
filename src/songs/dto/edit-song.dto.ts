import { ArrayMinSize, IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditSongDto {

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    readonly artists?: string[];

    @IsOptional()
    @IsDateString()
    readonly releasedDate?: Date;

    @IsOptional()
    @IsMilitaryTime()
    readonly duration?: Date;

    @IsOptional()
    @IsString()
    readonly lyrics: string;
}