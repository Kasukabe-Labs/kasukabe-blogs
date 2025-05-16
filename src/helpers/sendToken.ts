import { Response } from "express";

export const sendToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  message?: string
) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res
    .status(200)
    .json({ accessToken, message: message || "Login successfull" });
};
