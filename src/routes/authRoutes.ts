import express, { Request, Response, NextFunction } from "express";
import {
  login,
  logout,
  refreshToken,
  signup,
} from "../controllers/authController";
const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

router.post("/refresh", (req: Request, res: Response) => {
  refreshToken(req, res);
});

router.post("/logout", (req: Request, res: Response) => {
  logout(req, res);
});

export default router;
