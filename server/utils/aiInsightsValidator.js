function clampNumber(value, min, max, fallback = min) {
  const n = Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
}

function validateAiInsights(raw) {
  const safe = raw && typeof raw === "object" ? raw : {};

  const sectionFeedbackRaw =
    safe.sectionFeedback && typeof safe.sectionFeedback === "object"
      ? safe.sectionFeedback
      : {};

  const priorityActionsRaw = Array.isArray(safe.priorityActions)
    ? safe.priorityActions
    : [];

  const rewrittenBulletsRaw = Array.isArray(safe.rewrittenBullets)
    ? safe.rewrittenBullets
    : [];

  return {
    overallSummary:
      typeof safe.overallSummary === "string" ? safe.overallSummary.trim() : "",

    sectionFeedback: {
      skills: asStringArray(sectionFeedbackRaw.skills),
      projects: asStringArray(sectionFeedbackRaw.projects),
      experience: asStringArray(sectionFeedbackRaw.experience),
      education: asStringArray(sectionFeedbackRaw.education),
      certifications: asStringArray(sectionFeedbackRaw.certifications),
      training: asStringArray(sectionFeedbackRaw.training),
    },

    priorityActions: priorityActionsRaw
      .map((item) => ({
        action: typeof item?.action === "string" ? item.action.trim() : "",
        impact: ["high", "medium", "low"].includes(item?.impact)
          ? item.impact
          : "medium",
        reason: typeof item?.reason === "string" ? item.reason.trim() : "",
      }))
      .filter((item) => item.action),

    rewrittenBullets: rewrittenBulletsRaw
      .map((item) => ({
        original:
          typeof item?.original === "string" ? item.original.trim() : "",
        rewritten:
          typeof item?.rewritten === "string" ? item.rewritten.trim() : "",
        rationale:
          typeof item?.rationale === "string" ? item.rationale.trim() : "",
        confidence: clampNumber(item?.confidence, 0, 1, 0),
      }))
      .filter((item) => item.original && item.rewritten),

    confidence: clampNumber(safe.confidence, 0, 1, 0),
  };
}

module.exports = {
  validateAiInsights,
};