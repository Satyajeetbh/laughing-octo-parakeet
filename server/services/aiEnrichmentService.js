const { validateAiInsights } = require("../utils/aiInsightsValidator");
const { buildAiAnalysisPrompt } = require("../utils/aiPromptBuilder");

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJsonFromText(text) {
  if (!text || typeof text !== "string") return null;

  // 1) Direct parse
  const direct = safeJsonParse(text);
  if (direct) return direct;

  // 2) Extract first {...} block (best-effort)
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const maybe = text.slice(firstBrace, lastBrace + 1);
    return safeJsonParse(maybe);
  }

  return null;
}

function estimateAiScore(aiInsights) {
  let score = 55;

  const actionCount = aiInsights.priorityActions?.length || 0;
  const rewriteCount = aiInsights.rewrittenBullets?.length || 0;
  const conf = Number(aiInsights.confidence || 0);

  score += Math.min(20, actionCount * 4);
  score += Math.min(15, rewriteCount * 3);
  score += Math.round(conf * 10);

  return Math.min(100, Math.max(0, score));
}

async function callOpenAI({ system, user }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS || 25000);

  if (!apiKey) throw new Error("OPENAI_API_KEY is missing");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "resume_ai_insights",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                overallSummary: { type: "string" },
                sectionFeedback: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    skills: { type: "array", items: { type: "string" } },
                    projects: { type: "array", items: { type: "string" } },
                    experience: { type: "array", items: { type: "string" } },
                    education: { type: "array", items: { type: "string" } },
                    certifications: { type: "array", items: { type: "string" } },
                    training: { type: "array", items: { type: "string" } },
                  },
                  required: ["skills", "projects", "experience", "education", "certifications", "training"],
                },
                priorityActions: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      action: { type: "string" },
                      impact: { type: "string", enum: ["high", "medium", "low"] },
                      reason: { type: "string" },
                    },
                    required: ["action", "impact", "reason"],
                  },
                },
                rewrittenBullets: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      original: { type: "string" },
                      rewritten: { type: "string" },
                      rationale: { type: "string" },
                      confidence: { type: "number" },
                    },
                    required: ["original", "rewritten", "rationale", "confidence"],
                  },
                },
                confidence: { type: "number" },
              },
              required: ["overallSummary", "sectionFeedback", "priorityActions", "rewrittenBullets", "confidence"],
            },
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error?.message || "OpenAI request failed");
    }

    const text = data?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(text); // should be valid due json_schema strict

    return {
      parsed,
      meta: {
        model,
        promptTokens: data?.usage?.prompt_tokens || 0,
        completionTokens: data?.usage?.completion_tokens || 0,
        latencyMs: Date.now() - started,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackAiInsights({ skills, quantification }) {
  const raw = {
    overallSummary:
      "AI enrichment fallback: deterministic insights were generated because model output was unavailable.",
    sectionFeedback: {
      skills:
        skills.length > 0
          ? ["Skills detected. Add stronger context by linking each key skill to outcomes."]
          : ["No clear skills section found. Add one for better ATS visibility."],
      projects: ["Use STAR-style project bullets with metrics and technical decisions."],
      experience:
        quantification.quantified_bullets > 0
          ? ["Some quantified impact found; increase consistency across all major bullets."]
          : ["Add measurable achievements to experience bullets."],
      education: [],
      certifications: [],
      training: [],
    },
    priorityActions: [
      {
        action: "Add measurable outcomes to core bullets",
        impact: "high",
        reason: "Recruiters scan quickly for proof of impact.",
      },
      {
        action: "Tailor keywords to job description",
        impact: "high",
        reason: "Improves relevance and matching.",
      },
      {
        action: "Start bullets with stronger action verbs",
        impact: "medium",
        reason: "Improves readability and ownership perception.",
      },
    ],
    rewrittenBullets: [],
    confidence: 0.45,
  };

  return validateAiInsights(raw);
}

async function generateAiInsights({
  sections,
  skills,
  scoreData,
  quantification,
  jobDescription,
}) {
  const { system, user } = buildAiAnalysisPrompt({
    sections,
    skills,
    quantification,
    scoreData,
    jobDescription,
  });

  try {
    const ai = await callOpenAI({ system, user });
    const aiInsights = validateAiInsights(ai.parsed);
    const aiScore = estimateAiScore(aiInsights);

    return {
      aiInsights,
      aiScore,
      costMeta: ai.meta,
    };
  } catch (error) {
    // Never fail the whole resume pipeline due to AI stage
    console.error("AI enrichment fallback:", error.message);

    const aiInsights = fallbackAiInsights({ skills, quantification });
    const aiScore = estimateAiScore(aiInsights);

    return {
      aiInsights,
      aiScore,
      costMeta: {
        model: "fallback-local",
        promptTokens: 0,
        completionTokens: 0,
        latencyMs: 0,
      },
    };
  }
}

module.exports = {
  generateAiInsights,
};