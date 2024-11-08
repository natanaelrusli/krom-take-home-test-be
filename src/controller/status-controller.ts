import { NextFunction, Request, Response } from "express";
import { mapToGetAllStatusResponse, Status } from "../model/status-model";
import { applicationStatus } from "../constant/application-status";
import { StatusCode } from "../constant/error-code";

export class StatusController {
  static async getAllStatus(req: Request, res: Response, next: NextFunction) {
    const statuses: Status[] = applicationStatus;

    res
      .status(StatusCode.StatusOk)
      .json(mapToGetAllStatusResponse("ok", statuses));
  }
}
