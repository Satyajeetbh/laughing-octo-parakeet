const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadResume,
  getResumeStatus,
  getResumeResult,
  getResumeHistory,
} = require("../controllers/resumeController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getResumeHistory);
router.get("/:id/status", protect, getResumeStatus);
router.get("/:id", protect, getResumeResult);


module.exports = router;