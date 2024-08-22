import { OrderDirectionType } from '../enums/pagination.enum';

export interface ISortRequest {
  sort?: string;
  order?: OrderDirectionType;
}

export interface IPaginateRequest {
  perPage?: number;
  page?: number;
}

// Index Response

export interface IPaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
}

export interface IPaginateResponse<T> {
  meta: IPaginationMeta;
  data: Array<T>;
}
