import express from "express";
import { ApplicationController } from "../controller/application-controller";

export const applicationsRouter = express.Router();
applicationsRouter.post(
  "/api/applications",
  ApplicationController.getAllApplications
);
applicationsRouter.post(
  "/api/application",
  ApplicationController.getSingleApplication
);
applicationsRouter.post(
  "/api/application/new",
  ApplicationController.createNewApplication
);
