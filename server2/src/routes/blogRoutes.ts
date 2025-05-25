import express, { Request, Response } from "express";
import {
  getAllBlogs,
  getSingleBlog,
  postBlog,
} from "../controllers/blogsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const blogRouter = express.Router();

blogRouter.post("/create", authMiddleware, (req: Request, res: Response) => {
  postBlog(req, res);
});

blogRouter.get("/allBlogs", (req: Request, res: Response) => {
  getAllBlogs(req, res);
});

blogRouter.get("/:slug", (req: Request, res: Response) => {
  getSingleBlog(req, res);
});

export default blogRouter;
