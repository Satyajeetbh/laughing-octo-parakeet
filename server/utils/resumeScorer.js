const CORE_SKILLS = new Set([
  "javascript",
  "typescript",
  "python",
  "java",
  "c++",
  "react",
  "next.js",
  "node.js",
  "express.js",
  "mongodb",
  "mysql",
  "postgresql",
  "docker",
  "aws",
  "kubernetes",
  "redis",
  "spring boot",
  "django",
  "graphql",
]);

const TOOLING_SKILLS = new Set([
  "git",
  "github",
  "gitlab",
  "linux",
  "postman",
  "prisma",
  "jest",
  "webpack",
  "vite",
  "firebase",
  "chart.js",
  "ci/cd",
  "azure",
  "gcp",
  "socket.io",
  "stripe",
]);

const SUPPORTING_SKILLS = new Set([
  "html",
  "css",
  "tailwind css",
  "redux",
  "figma",
  "responsive design",
  "mvc architecture",
  "rest api",
  "authentication",
  "better auth",
  "inngest",
  "shadcn ui",
  "jetpack compose",
  "jetpack components",
  "kotlin",
]);

const STRONG_VERBS = new Set([
  "built",
  "developed",
  "implemented",
  "optimized",
  "improved",
  "reduced",
  "designed",
  "led",
  "created",
  "engineered",
  "integrated",
  "automated",
  "deployed",
  "scaled",
  "launched",
]);

const TECH_SIGNAL_TERMS = [
  "api",
  "apis",
  "backend",
  "frontend",
  "database",
  "authentication",
  "docker",
  "cloud",
  "deploy",
  "deployed",
  "performance",
  "responsive",
  "scalable",
  "real-time",
  "realtime",
  "workflow",
  "automation",
  "chart",
  "integration",
];

function calculateResumeScore({
  total_bullets,
  quantified_bullets,
  skills,
  wordCount,
  textToAnalyze,
  sections = {},
}) {
  const normalizedSkills = Array.isArray(skills)
    ? skills.map((skill) => skill.toLowerCase())
    : [];

  const sectionKeys = [
    "skills",
    "projects",
    "education",
  ];

  const optionalSectionKeys = [
    "experience",
  ];

  let sectionCompletenessScore = 0;

  sectionKeys.forEach((key) => {
    if (sections[key] && sections[key].trim()) {
      sectionCompletenessScore += 4;
    }
  });

  optionalSectionKeys.forEach((key) => {
    if (sections[key] && sections[key].trim()) {
      sectionCompletenessScore += 3;
    }
  });

  sectionCompletenessScore = Math.min(sectionCompletenessScore, 15);

  let weightedSkillPoints = 0;

  normalizedSkills.forEach((skill) => {
    if (CORE_SKILLS.has(skill)) {
      weightedSkillPoints += 3;
    } else if (TOOLING_SKILLS.has(skill)) {
      weightedSkillPoints += 2;
    } else if (SUPPORTING_SKILLS.has(skill)) {
      weightedSkillPoints += 1;
    }
  });

  const technicalSkillScore = Math.min(weightedSkillPoints, 25);

  let bulletStructureScore = 0;
  if (total_bullets >= 6) bulletStructureScore = 15;
  else if (total_bullets >= 4) bulletStructureScore = 10;
  else if (total_bullets >= 2) bulletStructureScore = 6;
  else bulletStructureScore = 2;

  const quantRatio =
    total_bullets > 0 ? quantified_bullets / total_bullets : 0;

  let quantifiedImpactScore = 0;
  if (quantRatio >= 0.6) quantifiedImpactScore = 20;
  else if (quantRatio >= 0.4) quantifiedImpactScore = 15;
  else if (quantRatio >= 0.2) quantifiedImpactScore = 10;
  else if (quantRatio > 0) quantifiedImpactScore = 5;
  else quantifiedImpactScore = 0;

  const bullets = (textToAnalyze || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(\u2022|•|\*|-|\d+\.)/.test(line));

  let strongVerbCount = 0;
  let techSignalCount = 0;

  bullets.forEach((bullet) => {
    const cleanedBullet = bullet
      .replace(/^(\u2022|•|\*|-|\d+\.)/, "")
      .trim();

    const firstWord = cleanedBullet.split(/\s+/)[0]?.toLowerCase();

    if (STRONG_VERBS.has(firstWord)) {
      strongVerbCount++;
    }

    const lowerBullet = cleanedBullet.toLowerCase();

    const hasTechSignal =
      normalizedSkills.some((skill) => lowerBullet.includes(skill)) ||
      TECH_SIGNAL_TERMS.some((term) => lowerBullet.includes(term));

    if (hasTechSignal) {
      techSignalCount++;
    }
  });

  const actionVerbRatio =
    bullets.length > 0 ? strongVerbCount / bullets.length : 0;

  let actionVerbScore = 0;
  if (actionVerbRatio >= 0.7) actionVerbScore = 10;
  else if (actionVerbRatio >= 0.4) actionVerbScore = 7;
  else if (actionVerbRatio > 0) actionVerbScore = 4;
  else actionVerbScore = 1;

  const techSignalRatio =
    bullets.length > 0 ? techSignalCount / bullets.length : 0;

  let projectExperienceTechScore = 0;
  if (techSignalRatio >= 0.8) projectExperienceTechScore = 10;
  else if (techSignalRatio >= 0.5) projectExperienceTechScore = 7;
  else if (techSignalRatio > 0) projectExperienceTechScore = 4;
  else projectExperienceTechScore = 0;

  let lengthScore = 0;
  if (wordCount >= 350 && wordCount <= 650) lengthScore = 5;
  else if (wordCount >= 250 && wordCount < 350) lengthScore = 4;
  else if (wordCount > 650 && wordCount <= 800) lengthScore = 3;
  else lengthScore = 1;

  const totalScore =
    sectionCompletenessScore +
    technicalSkillScore +
    bulletStructureScore +
    quantifiedImpactScore +
    actionVerbScore +
    lengthScore +
    projectExperienceTechScore;

  return {
    totalScore,
    breakdown: {
      sectionCompletenessScore,
      technicalSkillScore,
      bulletStructureScore,
      quantifiedImpactScore,
      actionVerbScore,
      lengthScore,
      projectExperienceTechScore,
    },
  };
}

module.exports = calculateResumeScore;