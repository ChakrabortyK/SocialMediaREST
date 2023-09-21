import express from "express";
const router = express.Router();
import * as blog from "../controllers/blogController.js";

router.get("/", blog.getAllBlogs);
router.get("/:id", blog.getBlogById);
router.post("/new", blog.addBlog);
router.put("/update/:id", blog.updateBlog);
// router.post("/login", user.loginUser);

export default router;
