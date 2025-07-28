import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BusinessException extends HttpException {
    details?: string | undefined;
    issues?: any[] | undefined;
    constructor(message: string, details?: string | undefined, issues?: any[] | undefined, statusCode?: HttpStatus);
}
