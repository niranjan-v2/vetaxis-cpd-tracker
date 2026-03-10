import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
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
    return next(errorHandler(400, "All fields are required"));
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    if (existingUser.email === email) {
      return next(
        errorHandler(409, "An account with this email already exists."),
      );
    }
    if (existingUser.username === username) {
      return next(errorHandler(409, "This username is already taken."));
    }
  }

  const passwordHash = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    passwordHash,
    profile: { title, fullName },
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
