import { BaseData, BaseResponse } from "../types";

export type Role = {
  id: number;
  role_name: string;
};

export type GetAllRoleResponse = BaseResponse<Role[]>;

type GetAllRoleRow = {
  id: number;
  role_name: string;
  created_time: string;
  updated_time: string;
};

export function mapRowToRole(row: GetAllRoleRow): Role {
  return {
    id: row.id,
    role_name: row.role_name,
  };
}

export function mapToGetAllRoleResponse(
  message: string,
  roles: Role[]
): GetAllRoleResponse {
  return {
    message,
    data: roles,
  };
}
