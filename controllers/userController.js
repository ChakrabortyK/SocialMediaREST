import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
  let allUsers;
  try {
    allUsers = await User.find();
    if (allUsers.length == 0) {
      return res.status(404).json({ message: "No Users found" });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPW = bcrypt.hashSync(password, 10);

  const createdUser = new User({
    name,
    email,
    password: hashedPW,
    blogs: [],
  });

  try {
    const user = await createdUser.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  // console.log(existingUser); //returns null if no user is found
  if (!existingUser) {
    return res.status(404).json({ message: "No user found" });
  }

  const isMatch = bcrypt.compareSync(password, existingUser.password);
  // console.log(isMatch); //returns true or false
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  res.status(200).json({ message: "Login Successful" });
};

export { getAllUsers, getUserById, createUser, loginUser };
