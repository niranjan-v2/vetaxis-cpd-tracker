const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new Schema(
  {
    board:      { type: String, required: false },
    regNumber:  { type: String, required: false },
    verified:   { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  { _id: false },
);

const profileSchema = new Schema(
  {
    fullName:     { type: String, required: true },
    phone:        { type: String },
    country:      { type: String },
    state:        { type: String },
    timezone:     { type: String },
    profession:   { type: String },
    registration: registrationSchema,
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email:        { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: {
      type:    [String],
      enum:    ["INDIVIDUAL", "ORG_ADMIN", "ORG_EDITOR", "SUPER_ADMIN"],
      default: ["INDIVIDUAL"],
    },
    status: {
      type:    String,
      enum:    ["ACTIVE", "SUSPENDED", "PENDING"],
      default: "PENDING",
    },
    lastLoginAt: { type: Date },
    profile:     profileSchema,
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);