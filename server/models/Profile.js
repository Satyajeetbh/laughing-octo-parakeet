const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    branch: {
      type: String,
      required: true
    },
    cgpa: {
      type: Number,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    resumeLink: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);