import { ArrayMinSize, IsArray, IsDateString, IsInt, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditSongDto {

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    @ArrayMinSize(1)
    readonly artists?;

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