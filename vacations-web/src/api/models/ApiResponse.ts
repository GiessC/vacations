export interface ApiResponse<TEntity> {
    statusCode: number;
    message: string;
    item?: TEntity;
    items?: TEntity[];
    error?: string;
    errors?: Record<string, string>;
}
