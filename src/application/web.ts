import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { logger, winstonLogger } from "../middleware/logger-middleware";
import { applicationsRouter } from "../route/application-router";
import { errorMiddleware } from "../middleware/error-middleware";
import { locationRouter } from "../route/location-router";
import { roleRouter } from "../route/role-router";
import { statusRouter } from "../route/status-router";

const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(logger);
app.use(applicationsRouter);
app.use(locationRouter);
app.use(roleRouter);
app.use(statusRouter);
app.use(errorMiddleware);

app.get("/", (_, res: Response) => {
  res.send("Applicant Tracking System API");
});

app.listen(port, () => {
  winstonLogger.info(`Running on port ${port}`);
});
