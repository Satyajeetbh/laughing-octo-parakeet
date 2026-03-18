const Resume = require("../models/Resume");
const resumeQueue = require("../queues/resumeQueue");

async function enqueueResumeJob({ userId, file, jobDescription }) {
  const resumeDoc = await Resume.create({
    user: userId,
    fileName: file.originalname,
    processingStatus: "queued",
    errorMessage: null,
  });

  const job = await resumeQueue.add("analyze-resume", {
    resumeId: resumeDoc._id.toString(),
    userId,
    fileBuffer: file.buffer.toString("base64"),
    originalName: file.originalname,
    mimetype: file.mimetype,
    jobDescription: jobDescription || "",
  });

  resumeDoc.jobId = job.id;
  await resumeDoc.save();

  return {
    resumeId: resumeDoc._id,
    jobId: job.id,
    processingStatus: resumeDoc.processingStatus,
  };
}

module.exports = {
  enqueueResumeJob,
};
