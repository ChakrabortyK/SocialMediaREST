import Blogs from "../models/blogModel.js";

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
    console.log(blogs);
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
  const blog = new Blogs({
    title,
    description,
    image,
    user,
  });

  try {
    const blogRes = await blog.save();
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

export { getAllBlogs, addBlog, updateBlog, getBlogById };
