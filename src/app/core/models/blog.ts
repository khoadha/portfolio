export interface Blog {
    title?: string;
    content?: string;
    thumbnailImageUrl?: string;
    createdDate?: string; // Alternatively, use Date if you want to work with Date objects
    blogCategories?: BlogCategory[] | null;
    id?: number;
    isDeleted?: boolean;
    categoryIds?: number[];
    viewCount?: number;
}

export interface BlogCategory {
    name: string;
    categoryId: number;
}

export enum BlogSortOptions {
    Default = 0,
    ViewLowToHigh = 1,
    ViewHighToLow = 2,
    DateEarliestToLatest = 3,
    DateLatestToEarliest = 4
}