import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../constant/error-code";
import { RoleService } from "../service/role-service";
import { mapToGetAllRoleResponse, Role } from "../model/role-model";

export class RoleController {
  static async getAllRoles(req: Request, res: Response, next: NextFunction) {
    const roles: Role[] = await RoleService.getAllRoles();

    res.status(StatusCode.StatusOk).json(mapToGetAllRoleResponse("ok", roles));
  }
}
