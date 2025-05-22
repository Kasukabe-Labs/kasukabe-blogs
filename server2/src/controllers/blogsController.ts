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
