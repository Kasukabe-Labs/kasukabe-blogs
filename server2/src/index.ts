import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blogRoutes";
import authRouter from "./routes/authRoutes";
import { healthRouter } from "./routes/healthRoutes";

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

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/health", healthRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
