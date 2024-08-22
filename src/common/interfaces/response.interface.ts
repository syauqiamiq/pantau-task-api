import { HttpCustomStatus } from '../enums/http.enum';
import { IPaginationMeta } from './pagination.interface';

export interface IApiResponse<T> {
  message?: string;
  pagination_meta?: IPaginationMeta;
  data: T;
}

export interface IApiSuccessResponseContract {
  status: HttpCustomStatus;
  request_meta: {
    status_code: number;
    request_id: string;
  };
  message: string | any;
  pagination_meta: IPaginationMeta;
  data: any;
}
export interface IApiErrorResponseContract {
  status: HttpCustomStatus;
  request_meta: {
    status_code: number | any;
    timestamp: string | any;
    path: string | any;
    request_id: string | any;
    method: string | any;
  };
  message: string | any;
  data: any;
}

interface IDataUnprocessable {
  property: string;
  message: string[];
}

export interface IUnprocessableResponse {
  message: string;
  data: Array<IDataUnprocessable>;
}
