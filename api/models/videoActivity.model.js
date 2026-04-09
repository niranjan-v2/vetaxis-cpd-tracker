import mongoose from "mongoose";
const { Schema } = mongoose;

const videoActivitySchema = new Schema(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId:     { type: Schema.Types.ObjectId, ref: "Video", required: true },
    youtubeId:   { type: String, required: true },
    title:       { type: String, required: true },
    category:    { type: String, required: true }, // first tag used as category
    cpdAwarded:  { type: Number, required: true },
    duration:    { type: Number, required: true }, // minutes
    watchedAt:   { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Prevent duplicate watch entries per user per video
videoActivitySchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model("VideoActivity", videoActivitySchema);