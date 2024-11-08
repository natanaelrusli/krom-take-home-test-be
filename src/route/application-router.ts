import express from 'express';
import { ApplicationController } from '../controller/application-controller';

export const applicationsRouter = express.Router();
applicationsRouter.post('/api/applications', ApplicationController.getAllApplications);
