export interface PaginationOptions {
    limit: number;
    page: number;
    total_records: number;
}

export interface ListResponse {
    data: {};
    pagination: PaginationOptions;
}