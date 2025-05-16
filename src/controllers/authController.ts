import { Request, Response } from "express";
import { UserModel } from "../models/user.schema";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";
import { sendToken } from "../helpers/sendToken";
import { comparePassword, encryptPassword } from "../helpers/encryptPassword";
import jwt from "jsonwebtoken";
import { sendMail } from "../helpers/sendMail";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role, secret } = req.body;

  if (role === "admin" && secret !== process.env.ADMIN_SIGNUP_SECRET) {
    return res.status(403).json({
      message: "Invalid secret for admin signup",
    });
  }

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "Email, password and role are required",
    });
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await encryptPassword(password);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
    name,
    role: role || "user",
  });

  const refreshToken = generateRefreshToken(
    newUser._id.toString(),
    newUser.role
  );
  const accessToken = generateAccessToken(newUser._id.toString(), newUser.role);

  sendToken(res, accessToken, refreshToken, "User created successfully");

  await newUser.save();

  sendMail(email);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Password not matched",
    });
  }

  const refreshToken = generateRefreshToken(user._id.toString(), user.role);
  const accessToken = generateAccessToken(user._id.toString(), user.role);

  sendToken(res, accessToken, refreshToken);
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as any;

    const accessToken = generateAccessToken(payload.id, payload.role);
    const refreshTokenNew = generateRefreshToken(payload.id, payload.role);

    sendToken(res, accessToken, refreshTokenNew);
  } catch (error) {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out" });
};
