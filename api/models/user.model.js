import mongoose from "mongoose";
import { Schema } from "mongoose";

const registrationSchema = new Schema(
  {
    board: { type: String, required: false },
    regNumber: { type: String, required: false },
    verified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  { _id: false },
);

const profileSchema = new Schema(
  {
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    country: { type: String },
    state: { type: String },
    timezone: { type: String },
    profession: { type: String },
    registration: registrationSchema,
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["INDIVIDUAL", "ORG_ADMIN", "ORG_EDITOR", "SUPER_ADMIN"],
      default: ["INDIVIDUAL"],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "PENDING"],
      default: "PENDING",
    },
    lastLoginAt: { type: Date },
    profile: profileSchema,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
