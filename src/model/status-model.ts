import { BaseResponse } from "../types";

export type Status = {
  id: number;
  status: string;
};

export type GetAllStatusResponse = BaseResponse<Status[]>;

export function mapToGetAllStatusResponse(
  message: string,
  statuses: Status[]
): GetAllStatusResponse {
  return {
    message,
    data: statuses,
  };
}
