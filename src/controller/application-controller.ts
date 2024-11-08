import { NextFunction, Request, Response } from "express";
import { Application, GetApplicationRequest, toApplicationResponse } from "../model/application-model";
import { ApplicationService } from "../service/application-service";

export class ApplicationController {

  static async getAllApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GetApplicationRequest = req.body as GetApplicationRequest;
      const applications: Application[] = await ApplicationService.getAllApplications(request);
      res.status(200).json(toApplicationResponse("ok", applications));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}