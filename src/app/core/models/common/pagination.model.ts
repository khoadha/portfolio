import { BlogSortOptions } from "../blog";

export interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

export interface PaginationResponse<T> {
    data: T;
    total: number;
}

export interface PaginationRequestBody {
    search?: string;
    size: number;
    offset: number;
}

export interface BlogPaginationRequestBody extends PaginationRequestBody {
    filterOptions: number[];
    sortOptions: BlogSortOptions;
}
