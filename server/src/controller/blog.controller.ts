import { Request, Response } from "express";
import { Blog } from "../model/blog";



// Add a new product
export const addBlog = async (req: Request, res: Response) => {
    try {
        const { writer, title, body, tags } = req.body;

        const blog = new Blog({
            writer,
            title,
            body,
            tags,
        });

        await blog.save();
        return res.status(201).json({ message: "New product blog!", data: blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create blog" });
    }
};

// Get all products
export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({ data: blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch blogs" });
    }
};


//getOne
export const getBlog = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        return res.status(200).json({ data: blog });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);

        if (!blog) {
            return res.status(404).json({ message: "No blog found." });
        }

        const updatedBlog = await Blog.findById(id);
        res.status(200).json(updatedBlog);

    } catch (error) {
        res.status(500).json({ message: "error updating blog" });
    }

};

export const deleteBlog = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete({ _id: id });

        if (!blog) {
            return res.status(404).json({ message: "No blog found." });
        }

        return res.status(200).json({ message: "blog  deleted!", data: blog });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};