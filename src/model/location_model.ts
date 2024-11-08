import { BaseResponse } from "../types";

export type Location = {
  id: number;
  location_name: string;
};

export type GetAllLocationResponse = BaseResponse<Location[]>;

type GetAllLocationRow = {
  id: number;
  location_name: string;
  created_time: string;
  updated_time: string;
};

export function mapRowToLocation(row: GetAllLocationRow): Location {
  return {
    id: row.id,
    location_name: row.location_name,
  };
}

export function mapToGetAllLocationResponse(
  message: string,
  locations: Location[]
): GetAllLocationResponse {
  return {
    message,
    data: locations,
  };
}
