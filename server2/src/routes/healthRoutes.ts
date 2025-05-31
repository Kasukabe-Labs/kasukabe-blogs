import express, { Request, Response } from "express";
import { healthCheck } from "../controllers/healthController";

export const healthRouter = express.Router();

healthRouter.get("/", (req: Request, res: Response) => {
  healthCheck(req, res);
});
