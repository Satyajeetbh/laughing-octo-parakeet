const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const cleanResumeText = require("../utils/cleanResumeText");
const parseSections = require("../utils/sectionParser");
const extractSkills = require("../utils/skillExtractor");
const detectQuantification = require("../utils/quantificationDetector");
const calculateResumeScore = require("../utils/resumeScorer");
const generateFeedback = require("../utils/feedbackGenerator");
const matchResumeToJD = require("../utils/jdMatcher");
const normalizeSkills = require("../utils/skillNormalizer");

async function processResumeAnalysis({
  resumeId,
  fileBuffer,
  originalName,
  userId,
  jobDescription,
}) {
  const data = await pdfParse(fileBuffer);

  const text = cleanResumeText(data.text || "");
  const sections = parseSections(text);

  const skillSourceText = [
    sections.skills || "",
    sections.projects || "",
    sections.experience || "",
    sections.training || "",
    sections.certifications || "",
  ].join("\n");

  let skills = extractSkills(skillSourceText);
  skills = normalizeSkills(skills);

  const textToAnalyze =
    (sections.experience || "") + "\n" + (sections.projects || "");

  const quantification = detectQuantification(textToAnalyze);

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  const scoreData = calculateResumeScore({
    total_bullets: quantification.total_bullets,
    quantified_bullets: quantification.quantified_bullets,
    skills,
    wordCount,
    textToAnalyze,
    sections,
  });

  let jdMatch = null;

  if (jobDescription && jobDescription.trim()) {
    jdMatch = matchResumeToJD(skills, jobDescription);
  }

  let finalScore = scoreData.totalScore;

  if (jdMatch) {
    finalScore = Math.round(
      scoreData.totalScore * 0.7 + jdMatch.matchPercentage * 0.3
    );
  }

  const feedback = generateFeedback({
    scoreBreakdown: scoreData.breakdown,
    quantification,
    wordCount,
  });

  const updatedResume = await Resume.findByIdAndUpdate(
    resumeId,
    {
      user: userId,
      fileName: originalName,
      extractedText: text,
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
      processingStatus: "completed",
      errorMessage: null,
      processedAt: new Date(),
    },
    { new: true }
  );

  if (!updatedResume) {
    throw new Error("Resume record not found while updating analysis result");
  }

  return updatedResume;
}

module.exports = {
  processResumeAnalysis,
};