import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../constants";
import { Type } from "class-transformer";

export class QueryOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit?: number= 10;

    // @IsString()
    // @IsOptional()
    // readonly search?: string;

    get skip(): number {
        console.log(this.page, this.limit)
        return ((this.page - 1) * this.limit);
    }

}