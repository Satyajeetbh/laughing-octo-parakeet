const Resume = require("../models/Resume");
const resumeQueue = require("../queues/resumeQueue");

function getUtcDayStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

async function enforceAiDailyQuota({ userId }) {
  const limit = Number(process.env.AI_DAILY_LIMIT_PER_USER || 3);
  if (!Number.isFinite(limit) || limit <= 0) return;

  const startOfDay = getUtcDayStart();

  const countToday = await Resume.countDocuments({
    user: userId,
    analyzeWithAI: true,
    createdAt: { $gte: startOfDay },
  });

  if (countToday >= limit) {
    const err = new Error(`AI daily limit reached (${limit}/day). Try again tomorrow or use non-AI mode.`);
    err.statusCode = 429;
    throw err;
  }
}

async function enqueueResumeJob({ userId, file, jobDescription, analyzeWithAI = false }) {
  const aiFeatureEnabled = String(process.env.AI_FEATURE_ENABLED || "false").toLowerCase() === "true";

  // Force off if global switch is disabled
  const finalAnalyzeWithAI = aiFeatureEnabled ? Boolean(analyzeWithAI) : false;

  // Quota check only if AI mode requested
  if (finalAnalyzeWithAI) {
    await enforceAiDailyQuota({ userId });
  }

  const previousResume = await Resume.findOne({
    user: userId,
    processingStatus: "completed",
  })
    .sort({ createdAt: -1 })
    .select("_id");

  const resumeDoc = await Resume.create({
    user: userId,
    fileName: file.originalname,
    processingStatus: "queued",
    errorMessage: null,
    previousResumeId: previousResume?._id || null,
    analyzeWithAI: finalAnalyzeWithAI,
  });

  const job = await resumeQueue.add("analyze-resume", {
    resumeId: resumeDoc._id.toString(),
    userId,
    fileBuffer: file.buffer.toString("base64"),
    originalName: file.originalname,
    mimetype: file.mimetype,
    jobDescription: jobDescription || "",
    analyzeWithAI: finalAnalyzeWithAI,
  });

  resumeDoc.jobId = job.id;
  await resumeDoc.save();

  return {
    resumeId: resumeDoc._id,
    jobId: job.id,
    processingStatus: resumeDoc.processingStatus,
    analyzeWithAI: finalAnalyzeWithAI,
  };
}

module.exports = {
  enqueueResumeJob,
};