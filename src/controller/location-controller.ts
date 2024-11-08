import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../constant/error-code";
import { Location, mapToGetAllLocationResponse } from "../model/location_model";
import { LocationService } from "../service/location-service";

export class LocationController {
  static async getAllLocations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const locations: Location[] = await LocationService.getAllLocations();

    res
      .status(StatusCode.StatusOk)
      .json(mapToGetAllLocationResponse("ok", locations));
  }
}
