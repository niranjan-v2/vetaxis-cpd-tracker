import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) return next(errorHandler(401, "Unauthorised"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(403, "Invalid or expired token"));

    try {
      const user = await User.findById(decoded.id).select("profile.profession").lean();
      req.user = {
        id:         decoded.id,
        profession: user?.profile?.profession ?? "veterinarian",
      };
      next();
    } catch {
      return next(errorHandler(500, "Failed to verify token"));
    }
  });
};