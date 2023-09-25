import mongoose from "mongoose";
import Blogs from "../models/blogModel.js";
import User from "../models/userModel.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();

    if (blogs.length == 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blogs = await Blogs.findById(id);
    // console.log(blogs);
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let existingUser = null;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "unable to find user" });
  }
  const blog = new Blogs({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const blogRes = await blog.save();
    existingUser.blogs.push(blogRes);
    // console.log(existingUser);
    await existingUser.save();
    await session.commitTransaction();
    return res.status(201).json(blogRes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, description, image, user } = req.body;

  try {
    const updatedBlogData = await Blogs.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
        image,
        user,
      },
      { new: true }
    );

    return res.status(201).json(updatedBlogData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const deleteById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blogs.findByIdAndDelete(blogId);
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllBlogs, addBlog, updateBlog, getBlogById, deleteById };
