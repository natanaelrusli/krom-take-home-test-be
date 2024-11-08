import { NextFunction, Request, Response } from "express";
import {
  Application,
  GetApplicationRequest,
  toApplicationResponse,
} from "../model/application-model";
import { ApplicationService } from "../service/application-service";
import { mapToResponseMeta, ResponseMeta } from "../types";

export class ApplicationController {
  static async getAllApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: GetApplicationRequest = req.body as GetApplicationRequest;

      if (!request.curr_page) {
        request.curr_page = 1;
      }

      if (!request.page_size) {
        request.page_size = 15;
      }

      const applications: Application[] =
        await ApplicationService.getAllApplications(request);

      const meta: ResponseMeta = mapToResponseMeta(request);

      res.status(200).json(toApplicationResponse("ok", meta, applications));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
