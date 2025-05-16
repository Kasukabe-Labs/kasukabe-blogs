import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

const app = express();
dotenv.config();

app.use(express.json());

connectDB();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Blog CMS API running...");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
