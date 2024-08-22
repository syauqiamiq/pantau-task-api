import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpCustomStatus } from 'src/common/enums/http.enum';
import { IApiErrorResponseContract } from 'src/common/interfaces/response.interface';
import { v4 as uuidv4 } from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const requestId = uuidv4();

    const errorResponse: IApiErrorResponseContract = {
      status: HttpCustomStatus.ERROR,
      request_meta: {
        status_code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        request_id: requestId,
        method: request.method,
      },
      message:
        (typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message) || 'Internal server error',
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
