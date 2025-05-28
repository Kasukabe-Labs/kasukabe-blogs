import express, { Request, Response } from "express";
import {
  allBlogsOfUser,
  deleteBlogController,
  getAllBlogs,
  getSingleBlog,
  postBlog,
  updateBlogController,
} from "../controllers/blogsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const blogRouter = express.Router();

blogRouter.post("/create", authMiddleware, (req: Request, res: Response) => {
  postBlog(req, res);
});

blogRouter.get("/allBlogs", (req: Request, res: Response) => {
  getAllBlogs(req, res);
});

blogRouter.get(
  "/allUserBlogs",
  authMiddleware,
  (req: Request, res: Response) => {
    allBlogsOfUser(req, res);
  }
);

blogRouter.get("/:slug", (req: Request, res: Response) => {
  getSingleBlog(req, res);
});

blogRouter.patch("/:slug", authMiddleware, (req: Request, res: Response) => {
  updateBlogController(req, res);
});

blogRouter.delete("/:slug", authMiddleware, (req: Request, res: Response) => {
  deleteBlogController(req, res);
});

export default blogRouter;
