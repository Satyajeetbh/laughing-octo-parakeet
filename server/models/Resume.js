const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wordCount: Number,
    charCount: Number,
    skills: [String],
    quantification: {
      total_bullets: Number,
      quantified_bullets: Number,
      percentage_mentions: Number,
      number_mentions: Number,
    },
    resumeScore: {
    type: Number,
    default: 0
    },
    scoreBreakdown: {
    bulletScore: Number,
    quantScore: Number,
    skillsScore: Number,
    actionScore: Number,
    lengthScore: Number
    },
    feedback: {
    strengths: [String],
    improvements: [String]
    },
    jdMatch: {
    matchPercentage: Number,
    matchedKeywords: [String],
    missingKeywords: [String]
    },
    finalScore: Number,
    sections: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);