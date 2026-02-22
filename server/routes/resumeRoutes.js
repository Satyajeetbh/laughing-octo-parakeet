const express = require("express")
const multer = require("multer")
const { uploadResume } = require("../controllers/resumeController")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF files are allowed"))
    }
  }
})

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
)

module.exports = router;