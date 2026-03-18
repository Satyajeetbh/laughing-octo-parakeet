const { Worker } = require("bullmq");
const dotenv = require("dotenv");
const connection = require("../config/redis");
const Resume = require("../models/Resume");
const { processResumeAnalysis } = require("../services/resumeAnalysisService");
const connectDB = require("../config/dbConfig");

dotenv.config();

async function bootstrap() {
  await connectDB();

  const worker = new Worker(
    "resume-processing",
    async (job) => {
      const { resumeId, userId, fileBuffer, originalName, jobDescription } = job.data;

      await Resume.findByIdAndUpdate(resumeId, {
        processingStatus: "processing",
        errorMessage: null,
      });

      const decodedBuffer = Buffer.from(fileBuffer, "base64");

      const result = await processResumeAnalysis({
        resumeId,
        fileBuffer: decodedBuffer,
        originalName,
        userId,
        jobDescription,
      });

      return {
        resumeId: result._id.toString(),
        finalScore: result.finalScore,
      };
    },
    { connection }
  );

  worker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed`, result);
  });

  worker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed`, err.message);

    if (job?.data?.resumeId) {
      await Resume.findByIdAndUpdate(job.data.resumeId, {
        processingStatus: "failed",
        errorMessage: err.message,
      });
    }
  });
}

bootstrap().catch((err) => {
  console.error("Worker bootstrap failed:", err);
  process.exit(1);
});
