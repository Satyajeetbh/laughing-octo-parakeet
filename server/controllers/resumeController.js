const pdfParse = require("pdf-parse")
const parseSections = require("../utils/sectionParser")
const extractSkills = require("../utils/skillExtractor")
const detectQuantification = require("../utils/quantificationDetector");
const Resume = require("../models/Resume");
const calculateResumeScore = require("../utils/resumeScorer");
const generateFeedback = require("../utils/feedbackGenerator");
const matchResumeToJD = require("../utils/jdMatcher");
const normalizeSkills = require("../utils/skillNormalizer");



exports.uploadResume = async (req, res) => {
    console.log("Received resume upload request")
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const data = await pdfParse(req.file.buffer)

    const text = data.text.replace(/\r/g, "").trim()

    const sections = parseSections(text)

    let skills = extractSkills(sections.skills);
  skills = normalizeSkills(skills);

    const textToAnalyze =(sections.experience || "") + "\n" + (sections.projects || "");

    const quantification = detectQuantification(textToAnalyze);


    
    // console.log(sections.experience)
    

    const wordCount = text.split(" ").length
    const charCount = text.length
    const scoreData = calculateResumeScore({
  total_bullets: quantification.total_bullets,
  quantified_bullets: quantification.quantified_bullets,
  skills,
  wordCount,
  textToAnalyze
});

let jdMatch = null;

if (req.body && req.body.jobDescription && req.body.jobDescription.trim())  {
  jdMatch = matchResumeToJD(
    skills,
    req.body.jobDescription
  );
}
let finalScore = scoreData.totalScore;

if (jdMatch) {
  finalScore = Math.round(
    scoreData.totalScore * 0.7 +
    jdMatch.matchPercentage * 0.3
  );
}
  const feedback = generateFeedback({
  scoreBreakdown: scoreData.breakdown,
  quantification,
  wordCount
});

  const savedResume = await Resume.create({
  user: req.user.id,
  wordCount,
  charCount,
  skills,
  quantification,
  resumeScore: scoreData.totalScore,
  scoreBreakdown: scoreData.breakdown,
  sections,
  feedback,
  jdMatch,
  finalScore,
});

return res.status(200).json(savedResume);
    
  } catch (error) {
    return res.status(500).json({
      message: "Error processing resume",
      error: error.message
    })
  }
  
}


