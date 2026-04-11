export type ResumeHistoryItem = {
  _id: string;
  fileName: string;
  processingStatus: "queued" | "processing" | "completed" | "failed";
  finalScore?: number;
  processedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ScoreBreakdown = {
  sectionCompletenessScore: number;
  technicalSkillScore: number;
  bulletStructureScore: number;
  quantifiedImpactScore: number;
  actionVerbScore: number;
  lengthScore: number;
  projectExperienceTechScore: number;
};

export type Quantification = {
  total_bullets: number;
  quantified_bullets: number;
  percentage_mentions: number;
  number_mentions: number;
};

export type JDMatch = {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
};

export type PriorityAction = {
  action: string;
  impact: "high" | "medium" | "low";
  reason: string;
};

export type RewrittenBullet = {
  original: string;
  rewritten: string;
  rationale: string;
  confidence: number;
};

export type AIInsights = {
  overallSummary: string;
  sectionFeedback: {
    skills: string[];
    projects: string[];
    experience: string[];
    education: string[];
    certifications: string[];
    training: string[];
  };
  priorityActions: PriorityAction[];
  rewrittenBullets: RewrittenBullet[];
  confidence: number;
};

export type CostMeta = {
  model: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
};

export type ResumeResult = {
  _id: string;
  previousResumeId?: string | null;
  analysisVersion?: string;
  processingStatus: "queued" | "processing" | "completed" | "failed";
  fileName: string;
  extractedText: string;

  wordCount: number;
  charCount: number;

  skills: string[];
  sections: Record<string, string>;
  sectionOrder?: string[];

  quantification: Quantification;
  resumeScore: number;
  scoreBreakdown: ScoreBreakdown;
  finalScore: number;

  feedback: {
    strengths: string[];
    improvements: string[];
  };

  jdMatch?: JDMatch | null;

  aiInsights?: AIInsights;
  evaluation?: {
    ruleScore: number;
    aiScore: number;
    finalCompositeScore: number;
  };

  costMeta?: CostMeta;

  createdAt: string;
  updatedAt: string;
};

export type ResumeComparison = {
  currentResumeId: string;
  previousResumeId: string;
  deltas: {
    finalScore: number;
    ruleScore: number;
    aiScore: number;
    quantifiedBullets: number;
    totalBullets: number;
  };
  current: {
    finalScore: number;
    ruleScore: number;
    aiScore: number;
    quantifiedBullets: number;
    totalBullets: number;
    skillsCount: number;
  };
  previous: {
    finalScore: number;
    ruleScore: number;
    aiScore: number;
    quantifiedBullets: number;
    totalBullets: number;
    skillsCount: number;
  };
  skills: {
    added: string[];
    removed: string[];
  };
};