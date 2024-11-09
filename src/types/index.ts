export type BaseData = {
  created_time: string;
  deleted_time?: string;
  updated_time?: string;
};

export type ResponseMeta = {
  curr_page?: number;
  page_size?: number;
  timestamp: number;
  total_data?: number;
};

export type BaseResponse<T> = {
  message?: string;
  meta?: ResponseMeta;
  data: T;
};

export function mapToResponseMeta(
  req?: any,
  total_data?: number
): ResponseMeta {
  return {
    curr_page: req.curr_page || 1,
    page_size: req.page_size || 10,
    timestamp: Date.now(),
    total_data: total_data,
  };
}
