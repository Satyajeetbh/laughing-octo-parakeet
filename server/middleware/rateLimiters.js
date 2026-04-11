const rateLimit = require("express-rate-limit");

const uploadLimiter = rateLimit({
  windowMs: Number(process.env.UPLOAD_RATE_LIMIT_WINDOW_MIN || 15) * 60 * 1000,
  max: Number(process.env.UPLOAD_RATE_LIMIT_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many upload attempts. Please wait and try again.",
  },
});

module.exports = {
  uploadLimiter,
};