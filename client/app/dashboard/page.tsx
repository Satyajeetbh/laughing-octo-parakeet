"use client";

import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import ResumeUploadCard from "@/components/dashboard/resume-upload-card";
import StatsGrid from "@/components/dashboard/stats-grid";
import SkillsCard from "@/components/dashboard/skills-card";
import SectionsCard from "@/components/dashboard/sections-card";
import ResumeScoreCard from "@/components/dashboard/resume-score-card";
import QuantificationChartCard from "@/components/dashboard/quantification-chart-card";
import ResumeHistoryCard from "@/components/dashboard/resume-history-card";
import FeedbackCard from "@/components/dashboard/feedback-card";
import JDMatchCard from "@/components/dashboard/jd-match-card";
import { getResumeStrength } from "@/lib/getResumeStrength";
import AnalysisSummaryCard from "@/components/dashboard/analysis-summary-card";
import AISummaryCard from "@/components/dashboard/ai-summary-card";
import PriorityActionsCard from "@/components/dashboard/priority-actions-card";
import RewriteSuggestionsCard from "@/components/dashboard/rewrite-suggestions-card";
import ResumeComparisonCard from "@/components/dashboard/resume-comparison-card";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const {
    file,
    setFile,
    jobDescription,
    setJobDescription,
    clearSelectedFile,
    result,
    error,
    isUploading,
    isOpeningHistory,
    resumeId,
    processingStatus,
    history,
    historyLoading,
    handleUpload,
    loadResumeFromHistory,
    comparison,
    comparisonLoading,
    analyzeWithAI,
    setAnalyzeWithAI,
  } = useResumeAnalysis(user);

  const detectedSections = result
    ? Array.isArray(result.sectionOrder) && result.sectionOrder.length > 0
      ? result.sectionOrder
      : Object.entries(result.sections)
          .filter(
            ([, value]) => typeof value === "string" && value.trim().length > 0,
          )
          .map(([key]) => key)
    : [];

  const strength = getResumeStrength(result?.finalScore);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <DashboardHeader name={user.name} onLogout={logout} />

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="mt-1 break-all font-medium text-foreground">
              {user.email}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">
                {isUploading
                  ? "Uploading..."
                  : isOpeningHistory
                    ? "Opening saved result..."
                    : processingStatus === "queued"
                      ? "Queued for processing"
                      : processingStatus === "processing"
                        ? "Analyzing..."
                        : processingStatus === "completed"
                          ? "Analysis complete"
                          : processingStatus === "failed"
                            ? "Analysis failed"
                            : "Ready to analyze"}
              </span>

              {strength && (
                <Badge variant={strength.variant} className="rounded-full">
                  {strength.label}
                </Badge>
              )}
            </div>
          </div>
        </section>

        <ResumeUploadCard
          file={file}
          loading={isUploading}
          jobDescription={jobDescription}
          onJobDescriptionChange={setJobDescription}
          onFileChange={setFile}
          onSubmit={handleUpload}
          clearFile={clearSelectedFile}
          analyzeWithAI={analyzeWithAI}
          onAnalyzeWithAIChange={setAnalyzeWithAI}
        />

        <ResumeHistoryCard
          history={history}
          historyLoading={historyLoading}
          actionLoading={isOpeningHistory}
          activeResumeId={resumeId}
          onOpenResume={loadResumeFromHistory}
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <>
            {result.jdMatch && (
              <JDMatchCard
                matchPercentage={result.jdMatch.matchPercentage}
                matchedKeywords={result.jdMatch.matchedKeywords}
                missingKeywords={result.jdMatch.missingKeywords}
              />
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <PriorityActionsCard
                actions={result.aiInsights?.priorityActions || []}
              />
              <RewriteSuggestionsCard
                rewrites={result.aiInsights?.rewrittenBullets || []}
              />
            </div>

            <AnalysisSummaryCard
              finalScore={result.finalScore}
              resumeScore={result.resumeScore}
              skillsCount={result.skills.length}
              hasJDMatch={!!result.jdMatch}
              strength={strength}
            />

            <ResumeComparisonCard
              comparison={comparison}
              loading={comparisonLoading}
            />

            <StatsGrid
              wordCount={result.wordCount}
              charCount={result.charCount}
              skillsCount={result.skills.length}
              sectionsCount={detectedSections.length}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <ResumeScoreCard
                resumeScore={result.resumeScore}
                finalScore={result.finalScore}
                scoreBreakdown={result.scoreBreakdown}
              />

              <QuantificationChartCard
                totalBullets={result.quantification.total_bullets}
                quantifiedBullets={result.quantification.quantified_bullets}
                percentageMentions={result.quantification.percentage_mentions}
                numberMentions={result.quantification.number_mentions}
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <FeedbackCard
                title="Strengths"
                description="What your resume is already doing well."
                items={result.feedback.strengths}
              />

              <FeedbackCard
                title="Improvements"
                description="Where the resume can be made stronger."
                items={result.feedback.improvements}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionsCard sections={detectedSections} />
              <SkillsCard skills={result.skills} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
