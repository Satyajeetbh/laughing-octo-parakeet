const mongoose = require("mongoose");

const rewrittenBulletSchema = new mongoose.Schema(
  {
    original: { type: String, default: "" },
    rewritten: { type: String, default: "" },
    rationale: { type: String, default: "" },
    confidence: { type: Number, default: 0 },
  },
  { _id: false }
);

const priorityActionSchema = new mongoose.Schema(
  {
    action: { type: String, default: "" },
    impact: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    reason: { type: String, default: "" },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    analysisVersion: {
      type: String,
      default: "1.0-rule-based",
    },

    analyzeWithAI: {
      type: Boolean,
      default: false,
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
      default: 0,
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
      improvements: [String],
    },

    jdMatch: {
      matchPercentage: Number,
      matchedKeywords: [String],
      missingKeywords: [String],
    },

    // ---------- NEW: NLP features ----------
    nlpFeatures: {
      actionVerbCoverage: { type: Number, default: 0 },
      weakPhraseCount: { type: Number, default: 0 },
      measurableImpactMentions: { type: Number, default: 0 },
      readability: {
        avgWordsPerBullet: { type: Number, default: 0 },
        longBulletCount: { type: Number, default: 0 },
      },
      bulletQuality: [
        {
          bullet: { type: String, default: "" },
          issues: [{ type: String }],
          score: { type: Number, default: 0 },
        },
      ],
    },

    // ---------- NEW: AI outputs ----------
    aiInsights: {
      overallSummary: { type: String, default: "" },

      sectionFeedback: {
        skills: [{ type: String }],
        projects: [{ type: String }],
        experience: [{ type: String }],
        education: [{ type: String }],
        certifications: [{ type: String }],
        training: [{ type: String }],
      },

      priorityActions: [priorityActionSchema],
      rewrittenBullets: [rewrittenBulletSchema],

      confidence: { type: Number, default: 0 },
    },

    // ---------- NEW: score split ----------
    evaluation: {
      ruleScore: { type: Number, default: 0 },
      aiScore: { type: Number, default: 0 },
      finalCompositeScore: { type: Number, default: 0 },
    },

    // ---------- NEW: model/cost observability ----------
    costMeta: {
      model: { type: String, default: "" },
      promptTokens: { type: Number, default: 0 },
      completionTokens: { type: Number, default: 0 },
      latencyMs: { type: Number, default: 0 },
    },

    finalScore: Number,

    sections: {
      type: Map,
      of: String,
    },

    sectionOrder: {
      type: [String],
      default: [],
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