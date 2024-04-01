import { PageMetaDtoParameters } from "../interfaces";

export class PageMetaDto {
    readonly page: number;

    readonly limit: number;

    readonly itemCount: number;

    readonly pageCount: number;

    readonly hasPreviousPage: boolean;

    readonly hasNextPage: boolean;

    constructor({queryOptionsDto, itemCount}: PageMetaDtoParameters) {
        this.page = queryOptionsDto.page;
        this.limit = queryOptionsDto.limit;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page > this.pageCount
    }
}