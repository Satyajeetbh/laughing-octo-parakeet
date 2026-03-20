export type ResumeResult = {
  wordCount: number;
  charCount: number;
  skills: string[];
  quantification: {
    total_bullets: number;
    quantified_bullets: number;
    percentage_mentions: number;
    number_mentions: number;
  };
  sections: Record<string, string>;
  resumeScore: number;
  finalScore: number;
  scoreBreakdown: {
    sectionCompletenessScore: number;
    technicalSkillScore: number;
    bulletStructureScore: number;
    quantifiedImpactScore: number;
    actionVerbScore: number;
    lengthScore: number;
    projectExperienceTechScore: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
  processingStatus?: "queued" | "processing" | "completed" | "failed";
  errorMessage?: string | null;
  jdMatch?: {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
} | null;
};

export type ResumeHistoryItem = {
  _id: string;
  fileName: string;
  processingStatus: "queued" | "processing" | "completed" | "failed";
  finalScore?: number;
  processedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};