const { Queue } = require("bullmq");
const connection = require("../config/redis");

const resumeQueue = new Queue("resume-processing", {
  connection,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 100,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  },
});

module.exports = resumeQueue;