import express, { Request, Response, NextFunction } from "express";
import {
  login,
  logout,
  me,
  refreshToken,
  signup,
} from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

authRouter.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

authRouter.post("/refresh", (req: Request, res: Response) => {
  refreshToken(req, res);
});

authRouter.post("/logout", (req: Request, res: Response) => {
  logout(req, res);
});

authRouter.get("/me", (req: Request, res: Response) => {
  me(req, res);
});

export default authRouter;
