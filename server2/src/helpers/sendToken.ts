import { Response } from "express";

export const sendToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  message?: string
) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.status(200).json({
    message:
      message || "Login successfull & both tokens set as httpOnly cookies",
  });
};
