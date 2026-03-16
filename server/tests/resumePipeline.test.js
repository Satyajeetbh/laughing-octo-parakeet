const fs = require("fs");
const path = require("path");

const cleanResumeText = require("../utils/cleanResumeText");
const parseSections = require("../utils/sectionParser");
const extractSkills = require("../utils/skillExtractor");
const normalizeSkills = require("../utils/skillNormalizer");
const detectQuantification = require("../utils/quantificationDetector");
const calculateResumeScore = require("../utils/resumeScorer");

const loadFixture = (filename) => {
  const filePath = path.join(__dirname, "fixtures", "resumes", filename);
  return fs.readFileSync(filePath, "utf8");
};

const runPipeline = (rawText) => {
  const cleanedText = cleanResumeText(rawText);
  const sections = parseSections(cleanedText);

  const skillSourceText = [
    sections.skills || "",
    sections.projects || "",
    sections.experience || "",
    sections.training || "",
    sections.certifications || "",
  ].join("\n");

  const extractedSkills = extractSkills(skillSourceText);
  const skills = normalizeSkills(extractedSkills);

  const textToAnalyze = [
    sections.experience || "",
    sections.projects || "",
  ].join("\n");

  const quantification = detectQuantification(textToAnalyze);

  const wordCount = cleanedText.split(/\s+/).filter(Boolean).length;

  const scoreData = calculateResumeScore({
    total_bullets: quantification.total_bullets,
    quantified_bullets: quantification.quantified_bullets,
    skills,
    wordCount,
    textToAnalyze,
    sections,
  });

  return {
    cleanedText,
    sections,
    skills,
    quantification,
    scoreData,
  };
};

describe("resume analysis pipeline", () => {
  test("parses a basic software engineer resume correctly", () => {
    const rawText = loadFixture("resume-basic-software-engineer.txt");
    const result = runPipeline(rawText);

    expect(result.sections.skills).toContain("JavaScript");
    expect(result.sections.projects).toContain("Resume Analyzer");
    expect(result.sections.education).toContain("Bachelor of Technology");

    expect(result.skills).toContain("javascript");
    expect(result.skills).toContain("typescript");
    expect(result.skills).toContain("react");
    expect(result.skills).toContain("next.js");
    expect(result.skills).toContain("node.js");
    expect(result.skills).toContain("mongodb");
    expect(result.skills).toContain("docker");

    expect(result.quantification.total_bullets).toBe(3);
    expect(result.scoreData.totalScore).toBeGreaterThan(40);
  });

  test("separates certifications and training from projects", () => {
    const rawText = loadFixture("resume-with-certifications-training.txt");
    const result = runPipeline(rawText);

    expect(result.sections.projects).toContain("Campus Event Platform");
    expect(result.sections.certifications).toContain("AWS Cloud Practitioner");
    expect(result.sections.training).toContain("Android Development Bootcamp");

    expect(result.sections.projects).not.toContain("AWS Cloud Practitioner");
    expect(result.sections.projects).not.toContain("Android Development Bootcamp");

    expect(result.skills).toContain("python");
    expect(result.skills).toContain("java");
    expect(result.skills).toContain("react");
    expect(result.skills).toContain("tailwind css");
    expect(result.skills).toContain("firebase");
    expect(result.skills).toContain("kotlin");
  });

  test("extracts skills even when there is no dedicated skills section", () => {
    const rawText = loadFixture("resume-no-skills-section.txt");
    const result = runPipeline(rawText);

    expect(result.sections.skills).toBe("");
    expect(result.sections.projects).toContain("Stock Tracker");
    expect(result.sections.experience).toContain("Software Intern");

    expect(result.skills).toContain("next.js");
    expect(result.skills).toContain("typescript");
    expect(result.skills).toContain("chart.js");
    expect(result.skills).toContain("rest api");
    expect(result.skills).toContain("react");
    expect(result.skills).toContain("tailwind css");
    expect(result.skills).toContain("node.js");
    expect(result.skills).toContain("express.js");
    expect(result.skills).toContain("mongodb");
    expect(result.skills).toContain("docker");
  });

  test("detects strong quantification in impact-heavy resumes", () => {
    const rawText = loadFixture("resume-high-quantification.txt");
    const result = runPipeline(rawText);

    expect(result.quantification.total_bullets).toBe(5);
    expect(result.quantification.quantified_bullets).toBeGreaterThanOrEqual(4);
    expect(result.quantification.percentage_mentions).toBeGreaterThanOrEqual(2);
    expect(result.quantification.number_mentions).toBeGreaterThanOrEqual(2);

    expect(result.scoreData.totalScore).toBeGreaterThan(60);
  });
    test("handles messy formatting and heading variations", () => {
    const rawText = loadFixture("resume-messy-formatting.txt");
    const result = runPipeline(rawText);

    expect(result.sections.skills).toContain("JavaScript");
    expect(result.sections.projects).toContain("Smart Attendance System");
    expect(result.sections.experience).toContain("Software Engineering Intern");
    expect(result.sections.certifications).toContain("AWS Cloud Practitioner");
    expect(result.sections.education).toContain("Bachelor of Technology");

    expect(result.skills).toContain("javascript");
    expect(result.skills).toContain("react");
    expect(result.skills).toContain("node.js");
    expect(result.skills).toContain("express.js");
    expect(result.skills).toContain("mongodb");
    expect(result.skills).toContain("docker");
    expect(result.skills).toContain("next.js");
    expect(result.skills).toContain("tailwind css");

    expect(result.quantification.total_bullets).toBe(5);
    expect(result.quantification.quantified_bullets).toBeGreaterThanOrEqual(1);
  });
    test("keeps quantification score lower for weak-impact resumes", () => {
    const rawText = loadFixture("resume-low-quantification.txt");
    const result = runPipeline(rawText);
    console.log("PROJECTS:\n", result.sections.projects);
console.log("QUANTIFICATION:", result.quantification);

    expect(result.sections.projects).toContain("Task Manager App");
    expect(result.sections.education).toContain("Bachelor of Technology");

    expect(result.skills).toContain("javascript");
    expect(result.skills).toContain("react");
    expect(result.skills).toContain("node.js");
    expect(result.skills).toContain("express.js");
    expect(result.skills).toContain("mongodb");
    expect(result.skills).toContain("git");

    expect(result.quantification.total_bullets).toBeGreaterThanOrEqual(5);
    expect(result.quantification.quantified_bullets).toBe(0);

    expect(result.scoreData.breakdown.quantifiedImpactScore).toBe(0);
    expect(result.scoreData.totalScore).toBeLessThan(80);
    console.log(result.sections.projects);
  });
});