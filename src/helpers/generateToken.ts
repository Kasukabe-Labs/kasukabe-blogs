import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.ACCESS_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

//accessToken expires --> /refresh --> gen new accessToken --> send to client
//refreshToken expires --> /login --> gen new refreshToken and accessToken --> send to client
//refreshToken is stored in the database
//accessToken is stored in the client(localStorage)
