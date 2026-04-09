import Video from "../models/video.model.js";
import VideoActivity from "../models/videoActivity.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getVideos = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const profession = req.user.profession;

    const filter = {
      isActive:   true,
      professions: profession,
    };

    if (tag) filter.tags = tag;

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    // Fetch which videos this user has already watched
    const watched = await VideoActivity.find({ userId: req.user.id })
      .select("videoId")
      .lean();

    const watchedIds = new Set(watched.map((w) => w.videoId.toString()));

    const videosWithState = videos.map((v) => ({
      ...v.toObject(),
      watched: watchedIds.has(v._id.toString()),
    }));

    res.status(200).json(videosWithState);
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const profession = req.user.profession;
    const tags = await Video.distinct("tags", {
      isActive:    true,
      professions: profession,
    });
    res.status(200).json(tags.sort());
  } catch (error) {
    next(error);
  }
};

export const getWatchedIds = async (req, res, next) => {
  try {
    const watched = await VideoActivity.find({ userId: req.user.id })
      .select("videoId")
      .lean();
    res.status(200).json(watched.map((w) => w.videoId.toString()));
  } catch (error) {
    next(error);
  }
};

export const markWatched = async (req, res, next) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return next(errorHandler(404, "Video not found"));

    // Check if already watched
    const existing = await VideoActivity.findOne({
      userId:  req.user.id,
      videoId: id,
    });

    if (existing) {
      return res.status(200).json({
        alreadyWatched: true,
        message: "You have already earned CPD points for this video.",
        cpdAwarded: 0,
      });
    }

    // Create activity record
    await VideoActivity.create({
      userId:     req.user.id,
      videoId:    video._id,
      youtubeId:  video.youtubeId,
      title:      video.title,
      category:   video.tags[0] ?? "General",
      cpdAwarded: video.cpdPoints,
      duration:   video.duration,
    });

    // Update user's CPD points using $round aggregation pipeline
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      [
        {
          $set: {
            "cpd.earnedPoints": {
              $round: [{ $add: ["$cpd.earnedPoints", video.cpdPoints] }, 2],
            },
            "cpd.lastUpdated": new Date(),
          },
        },
      ],
      { returnDocument: "after", updatePipeline: true },
    );

    const { passwordHash, ...userRest } = updatedUser._doc;

    res.status(201).json({
      alreadyWatched: false,
      cpdAwarded:     video.cpdPoints,
      updatedUser:    userRest,
    });
  } catch (error) {
    next(error);
  }
};