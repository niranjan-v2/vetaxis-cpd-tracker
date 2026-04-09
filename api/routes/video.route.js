import express from "express";
import {
  getVideos,
  getTags,
  getWatchedIds,
  markWatched,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",           verifyToken, getVideos);
router.get("/tags",       verifyToken, getTags);
router.get("/watched",    verifyToken, getWatchedIds);
router.post("/:id/watched", verifyToken, markWatched);

export default router;