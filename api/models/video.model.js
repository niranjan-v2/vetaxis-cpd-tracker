import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    youtubeId:    { type: String, required: true, unique: true },
    title:        { type: String, required: true },
    description:  { type: String, default: "" },
    duration:     { type: Number, required: true }, // minutes
    thumbnailUrl: { type: String, default: "" },
    professions:  {
      type: [String],
      enum: ["veterinarian", "veterinary_nurse", "student"],
      required: true,
    },
    tags:         { type: [String], default: [] },
    cpdPoints:    { type: Number, required: true }, // pre-calculated: duration/60 capped at 1.0
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true },
);

videoSchema.index({ professions: 1, isActive: 1 });
videoSchema.index({ tags: 1 });

export default mongoose.model("Video", videoSchema);