// src/common/exceptions/custom.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    public details?: string,
    public issues?: any[],
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        message,
        details,
        issues,
      },
      statusCode,
    );
  }
}