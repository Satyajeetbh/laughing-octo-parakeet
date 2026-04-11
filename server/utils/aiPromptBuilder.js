function truncate(text, maxChars = 6000) {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "\n...[truncated]";
}

function buildAiAnalysisPrompt({
  sections,
  skills,
  quantification,
  scoreData,
  jobDescription,
}) {
  const payload = {
    sections: {
      skills: truncate(sections.skills || "", 1200),
      projects: truncate(sections.projects || "", 2000),
      experience: truncate(sections.experience || "", 2500),
      education: truncate(sections.education || "", 1000),
      certifications: truncate(sections.certifications || "", 1000),
      training: truncate(sections.training || "", 1000),
    },
    skills,
    quantification,
    scoreBreakdown: scoreData?.breakdown || {},
    resumeScore: scoreData?.totalScore || 0,
    jobDescription: truncate(jobDescription || "", 2500),
  };

  const system = `
You are an expert resume reviewer for technical roles.
You MUST return valid JSON only. No markdown, no prose outside JSON.
Do not invent facts not present in provided content.
Focus on actionable, specific, high-signal feedback.
`;

  const user = `
Analyze this resume data and produce JSON with this exact shape:

{
  "overallSummary": "string",
  "sectionFeedback": {
    "skills": ["string"],
    "projects": ["string"],
    "experience": ["string"],
    "education": ["string"],
    "certifications": ["string"],
    "training": ["string"]
  },
  "priorityActions": [
    { "action": "string", "impact": "high|medium|low", "reason": "string" }
  ],
  "rewrittenBullets": [
    { "original": "string", "rewritten": "string", "rationale": "string", "confidence": 0.0 }
  ],
  "confidence": 0.0
}

Rules:
- priorityActions: 3 to 5 items max.
- rewrittenBullets: rewrite up to 5 weak bullets from experience/projects.
- rewritten bullets should be concise and measurable when possible.
- confidence must be between 0 and 1.
- If a section has no useful feedback, return empty array.
- Return JSON only.

Input data:
${JSON.stringify(payload)}
`;

  return { system: system.trim(), user: user.trim() };
}

module.exports = {
  buildAiAnalysisPrompt,
};