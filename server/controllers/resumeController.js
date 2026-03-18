const Resume = require("../models/Resume");
const { enqueueResumeJob } = require("../services/resumeJobService");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const jobDescription = req.body?.jobDescription || "";

    const queuedJob = await enqueueResumeJob({
      userId: req.user.id,
      file: req.file,
      jobDescription,
    });

    return res.status(202).json({
      message: "Resume queued for processing",
      resumeId: queuedJob.resumeId,
      jobId: queuedJob.jobId,
      processingStatus: queuedJob.processingStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to queue resume analysis",
      error: error.message,
    });
  }
};

const getResumeStatus = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).select("processingStatus errorMessage processedAt finalScore");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch resume status",
      error: error.message,
    });
  }
};

const getResumeResult = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch resume result",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResumeStatus,
  getResumeResult,
};