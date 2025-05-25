import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { BlogModel } from "../models/blog.schema";
import { generateSlug } from "../helpers/generateSlug";

export const postBlog = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      content,
      imageUrl,
      tags = [],
      isPublished = true,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content are required",
      });
    }

    const authorId = req.user?.id;
    if (!authorId) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    const baseSlug = generateSlug(title);

    let slug = baseSlug;
    let slugCounter = 1;

    while (await BlogModel.findOne({ slug })) {
      slug = `${baseSlug}-${slugCounter++}`;
    }

    const formattedTags = tags.map((tag: { name: string }) => ({
      name: tag.name,
      slug: generateSlug(tag?.name),
    }));

    const newBlog = new BlogModel({
      title,
      content,
      imageUrl,
      slug,
      author: authorId,
      tags: formattedTags,
      isPublished,
      isDraft: !isPublished,
      publishedAt: isPublished ? new Date() : null,
    });

    await newBlog.save();

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;

    let query = {};
    if (cursor) {
      query = { publishedAt: { $lt: new Date(cursor) } };
    }
    const blogs = await BlogModel.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit + 1)
      .select("title author publishedAt slug")
      .lean();

    const hasNextPage = blogs.length > limit;
    const paginatedBlogs = hasNextPage ? blogs.slice(0, -1) : blogs;

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: paginatedBlogs,
      nextCursor: hasNextPage
        ? paginatedBlogs[paginatedBlogs.length - 1].publishedAt
        : null,
    });
    return;
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

export const getSingleBlog = async (req: AuthRequest, res: Response) => {
  try {
    // const authorId = req.user?.id;
    // if (!authorId) {
    //   return res.status(401).json({
    //     message: "Not authorized",
    //   });
    // }

    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        message: "Blog slug is required",
      });
    }

    const blog = await BlogModel.findOne({ slug })
      .populate("author", "name email pfp")
    

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
