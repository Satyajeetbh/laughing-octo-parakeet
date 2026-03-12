const generateFeedback = ({
  scoreBreakdown,
  quantification,
  wordCount,
  sections = {},
}) => {
  const strengths = [];
  const improvements = [];

  const {
    sectionCompletenessScore,
    technicalSkillScore,
    bulletStructureScore,
    quantifiedImpactScore,
    actionVerbScore,
    lengthScore,
    projectExperienceTechScore,
  } = scoreBreakdown;

  if (sectionCompletenessScore >= 12) {
    strengths.push("Resume includes the core sections expected in a software engineering profile.");
  } else {
    improvements.push("Add or strengthen core sections like Skills, Projects, Education, and Experience.");
  }

  if (technicalSkillScore >= 18) {
    strengths.push("Technical stack shows strong engineering relevance across core tools and frameworks.");
  } else {
    improvements.push("Add stronger engineering skills relevant to your target role, especially core languages, frameworks, databases, or dev tools.");
  }

  if (bulletStructureScore >= 12) {
    strengths.push("Projects and experience use a solid bullet-based structure that improves readability.");
  } else {
    improvements.push("Use more clear bullet points under projects or experience instead of dense text blocks.");
  }

  if (quantifiedImpactScore >= 15) {
    strengths.push("Resume demonstrates measurable impact in multiple bullets.");
  } else {
    improvements.push(
      `Only ${quantification.quantified_bullets} out of ${quantification.total_bullets} bullets contain measurable outcomes. Add metrics like %, latency reduction, users served, or performance improvements.`
    );
  }

  if (actionVerbScore >= 7) {
    strengths.push("Bullets begin with strong action verbs, which makes achievements sound more direct and credible.");
  } else {
    improvements.push("Start more bullets with strong action verbs like Built, Implemented, Optimized, Integrated, or Deployed.");
  }

  if (projectExperienceTechScore >= 7) {
    strengths.push("Project and experience bullets clearly communicate technical implementation details.");
  } else {
    improvements.push("Mention more technical implementation details in bullets, such as APIs, databases, frameworks, deployment, or performance work.");
  }

  if (lengthScore >= 4) {
    strengths.push("Resume length is within a reasonable range for a software engineering profile.");
  } else if (wordCount < 250) {
    improvements.push("Resume is too short. Add stronger project depth, measurable results, and technical implementation details.");
  } else {
    improvements.push("Resume may be slightly too long. Keep bullets concise and focused on engineering impact.");
  }

  if (!sections.experience || !sections.experience.trim()) {
    improvements.push("If you have internships, freelance work, or major engineering contributions, include an Experience section.");
  }

  return {
    strengths,
    improvements,
  };
};

module.exports = generateFeedback;