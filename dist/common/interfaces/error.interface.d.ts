export interface ErrorResponse {
    statusCode: number;
    timestamp: string;
    path?: string;
    error: {
        code: string;
        message: string;
        details?: string;
        issues?: any[];
    };
}
