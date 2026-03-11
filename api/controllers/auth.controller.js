import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "Invalid username or password"));
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validUser.passwordHash,
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid username or password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
    );
    const { passwordHash: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
