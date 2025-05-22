import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = (req.headers.accessToken as string) || req.cookies.accessToken;
  console.log("Token:", token);

  if (!token) {
    res.status(401).json({ message: "No accessToken found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as any;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(403).json({ message: "Token failed" });
    return;
  }
};
