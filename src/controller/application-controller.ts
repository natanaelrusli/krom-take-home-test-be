import { NextFunction, Request, Response } from "express";
import {
  Application,
  CreateApplicationRequest,
  GetApplicationRequest,
  GetSingleApplicationRequest,
  mapToApplicationResponse,
  mapToSingleApplicationResponse,
} from "../model/application-model";
import { ApplicationService } from "../service/application-service";
import { mapToResponseMeta, ResponseMeta } from "../types";
import { NotFoundError } from "../errors/not-found-error";
import { StatusCode } from "../constant/error-code";
import { ResponseError } from "../errors/response-error";
import {
  validateEmail,
  validateNumber,
  validateString,
  validateUrl,
} from "../utils/validation";

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

      const totalDataCount: number =
        await ApplicationService.getTotalDataCount();

      const meta: ResponseMeta = mapToResponseMeta(request, totalDataCount);

      res
        .status(StatusCode.StatusOk)
        .json(mapToApplicationResponse("ok", meta, applications));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getSingleApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: GetSingleApplicationRequest =
        req.body as GetSingleApplicationRequest;

      if (!request.application_id) {
        throw new ResponseError(400, "please provide application_id");
      }

      const meta: ResponseMeta = mapToResponseMeta(request);

      const application: Application =
        await ApplicationService.getSingleApplication(request);

      res
        .status(StatusCode.StatusOk)
        .json(mapToSingleApplicationResponse("ok", meta, application));
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(StatusCode.StatusNotFound).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }

  static async createNewApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateApplicationRequest = {
        applicant_name: validateString(
          req.body.applicant_name,
          "Applicant name"
        ),
        applicant_email: validateEmail(req.body.applicant_email),
        applicant_phone_number: validateString(
          req.body.applicant_phone_number,
          "Phone number"
        ),
        role_id: validateNumber(req.body.role_id, "Role ID"),
        years_of_experience: validateNumber(
          req.body.years_of_experience,
          "Years of experience"
        ),
        location_id: validateNumber(req.body.location_id, "Location ID"),
        resume_link: validateUrl(req.body.resume_link),
      };

      const application: Application =
        await ApplicationService.createNewApplication(request);

      const meta: ResponseMeta = mapToResponseMeta(request);

      res
        .status(StatusCode.StatusCreated)
        .json(
          mapToSingleApplicationResponse(
            "Application created successfully",
            meta,
            application
          )
        );
    } catch (error) {
      if (error instanceof ResponseError) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
}
