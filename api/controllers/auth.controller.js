import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({ message: error.message });
  }
};
