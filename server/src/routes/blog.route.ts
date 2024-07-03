import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from "../controller/blog.controller";
import { auth } from "../middleware";

const router = express.Router();

router.post('/createBlog', auth(['writer']), addBlog);
//router.post('/login', login)

router.get('/blogs', getAllBlogs);
router.get('/blog/:id', getBlog);

router.put('/blog/:id', updateBlog)

router.delete('/blog/:id', deleteBlog)

export default router;
