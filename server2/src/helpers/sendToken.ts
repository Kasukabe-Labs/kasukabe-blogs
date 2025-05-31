import { Response } from "express";

export const sendToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  message?: string
) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // ✅ this must be true in production (over HTTPS)
    sameSite: "none", // ✅ this allows cookies to be sent cross-site
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true, // ✅
    sameSite: "none", // ✅
    maxAge: 15 * 60 * 1000,
  });
};

//development code:
// res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 15 * 60 * 1000, // 15 min
//   });
