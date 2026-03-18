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
    sectionCompletenessScore: { type: Number, default: 0 },
    technicalSkillScore: { type: Number, default: 0 },
    bulletStructureScore: { type: Number, default: 0 },
    quantifiedImpactScore: { type: Number, default: 0 },
    actionVerbScore: { type: Number, default: 0 },
    lengthScore: { type: Number, default: 0 },
    projectExperienceTechScore: { type: Number, default: 0 },
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
    processingStatus: {
    type: String,
    enum: ["queued", "processing", "completed", "failed"],
  default: "queued",
},
jobId: {
  type: String,
  default: null,
},
errorMessage: {
  type: String,
  default: null,
},
processedAt: {
  type: Date,
  default: null,
},
fileName: {
  type: String,
  default: "",
},
extractedText: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
