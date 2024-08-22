import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpCustomStatus } from 'src/common/enums/http.enum';
import { IApiSuccessResponseContract } from 'src/common/interfaces/response.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiSuccessResponseContract> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<any>();

    const requestId = uuidv4();
    return next.handle().pipe(
      map((data) => ({
        status: HttpCustomStatus.SUCCESS,
        request_meta: {
          status_code: response.statusCode,
          request_id: requestId,
        },
        message: data?.message || '',
        pagination_meta: data?.pagination_meta,
        data: data?.data,
      })),
    );
  }
}
