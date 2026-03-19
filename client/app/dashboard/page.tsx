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

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const {
  file,
  setFile,
  clearSelectedFile,
  result,
  error,
  loading,
  resumeId,
  processingStatus,
  history,
  historyLoading,
  handleUpload,
  loadResumeFromHistory,
} = useResumeAnalysis(user);

  const getResumeStrength = () => {
    if (!result) return null;

    const score = result.resumeScore;

    if (score >= 75) {
      return {
        label: "Strong structure",
        variant: "default" as const,
      };
    }

    if (score >= 50) {
      return {
        label: "Decent foundation",
        variant: "secondary" as const,
      };
    }

    return {
      label: "Needs work",
      variant: "outline" as const,
    };
  };

  const strength = getResumeStrength();

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
                {loading
                  ? "Uploading..."
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
          loading={loading}
          onFileChange={setFile}
          onSubmit={handleUpload}
          clearFile={clearSelectedFile}
        />

        <ResumeHistoryCard
          history={history}
          historyLoading={historyLoading}
          actionLoading={loading}
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
            <StatsGrid
              wordCount={result.wordCount}
              charCount={result.charCount}
              skillsCount={result.skills.length}
              sectionsCount={Object.keys(result.sections).length}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <ResumeScoreCard
                resumeScore={result.resumeScore}
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
              <SectionsCard sections={Object.keys(result.sections)} />
              <SkillsCard skills={result.skills} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}