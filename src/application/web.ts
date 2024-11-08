import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { logger, winstonLogger } from "../middleware/logger-middleware";
import { applicationsRouter } from "../route/application-router";

const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(logger);

app.use(applicationsRouter);

app.get("/", (_, res: Response) => {
  res.send("Applicant Tracking System API");
});

app.listen(port, () => {
  winstonLogger.info(`Running on port ${port}`);
});
