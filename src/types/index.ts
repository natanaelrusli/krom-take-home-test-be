export type BaseData = {
  created_time: string;
  deleted_time?: string;
  updated_time?: string;
}

export type BaseResponse<T> = {
  message: string;
  data: T;
}
