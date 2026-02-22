const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createOrUpdateProfile } = require("../controllers/profileController");

router.put("/", protect, createOrUpdateProfile);

module.exports = router;