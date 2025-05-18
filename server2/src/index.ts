import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

connectDB();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Blog CMS API running...");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
