import express, { Express, Response } from "express";
import dotenv from "dotenv";
import { logger, winstonLogger } from "../middleware/logger-middleware";

const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(logger);

app.get("/", (_, res: Response) => {
  res.send("Applicant Tracking System API");
});

app.listen(port, () => {
  winstonLogger.info(`Running on port ${port}`);
});
