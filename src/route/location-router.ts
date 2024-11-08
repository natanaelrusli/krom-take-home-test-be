import express from "express";
import { LocationController } from "../controller/location-controller";

export const locationRouter = express.Router();
locationRouter.get("/api/location", LocationController.getAllLocations);
