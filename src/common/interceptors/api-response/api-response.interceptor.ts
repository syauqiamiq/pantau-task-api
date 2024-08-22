import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpCustomStatus } from 'src/common/enums/http.enum';
import { IApiSuccessResponseContract } from 'src/common/interfaces/response.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ApiResponseInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiSuccessResponseContract> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<Request>();

    const requestId = uuidv4();

    return next.handle().pipe(
      map((data) => {
        const logEntry = {
          level: 'log',
          timestamp: new Date().toISOString(),
          requestId: requestId,
          method: request.method,
          url: request.url,
          status: HttpCustomStatus.SUCCESS,
          message: data?.message || '',
        };
        this.logger.log(JSON.stringify(logEntry));
        return {
          status: HttpCustomStatus.SUCCESS,
          request_meta: {
            status_code: response.statusCode,
            request_id: requestId,
          },
          message: data?.message || '',
          pagination_meta: data?.pagination_meta,
          data: data?.data,
        };
      }),
    );
  }
}
