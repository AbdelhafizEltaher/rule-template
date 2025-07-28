/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/error.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'Internal server error';
    let details: string | undefined;
    let issues: any[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorCode = (exceptionResponse as any).error || exception.name;
      message =
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as any).message
          : exceptionResponse;
      details = (exceptionResponse as any).details;
      issues = (exceptionResponse as any).issues;
    } else if (exception instanceof Error) {
      errorCode = exception.name;
      message = exception.message;
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        code: errorCode,
        message,
        details,
        issues,
      },
    };

    response.status(status).json(errorResponse);
  }
}