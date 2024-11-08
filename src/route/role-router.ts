import express from "express";
import { RoleController } from "../controller/role-controller";

export const roleRouter = express.Router();
roleRouter.get("/api/role", RoleController.getAllRoles);
