import express from "express";
import { StatusController } from "../controller/status-controller";

export const statusRouter = express.Router();
statusRouter.get("/api/application_status", StatusController.getAllStatus);
