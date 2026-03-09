import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { email, title, fullName, username, password } = req.body;
  if (
    !email ||
    !title ||
    !fullName ||
    !username ||
    !password ||
    email === "" ||
    title === "" ||
    fullName === "" ||
    username === "" ||
    password === ""
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const passwordHash = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    title,
    fullName,
    username,
    email,
    passwordHash,
  });
  try {
    await newUser.save();
    res.status(200).json("Signup successful");
  } catch (error) {
    next(error);
  }
};
