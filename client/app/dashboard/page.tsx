"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import ResumeUploadCard from "@/components/dashboard/resume-upload-card";
import StatsGrid from "@/components/dashboard/stats-grid";
import SkillsCard from "@/components/dashboard/skills-card";
import SectionsCard from "@/components/dashboard/sections-card";
import ResumeScoreCard from "@/components/dashboard/resume-score-card";
import QuantificationChartCard from "@/components/dashboard/quantification-chart-card";

import { Alert, AlertDescription } from "@/components/ui/alert";

type ResumeResponse = {
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
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

    const getResumeStrength = () => {
    if (!result) return null;

    const sectionCount = Object.keys(result.sections).length;
    const skillCount = result.skills.length;
    const quantified = result.quantification.quantified_bullets;

    const score = sectionCount + skillCount + quantified;

    if (score >= 15) {
      return {
        label: "Strong structure",
        variant: "default" as const,
      };
    }

    if (score >= 8) {
      return {
        label: "Decent foundation",
        variant: "secondary" as const,
      };
    }
    const strength = getResumeStrength();

    return {
      label: "Needs work",
      variant: "outline" as const,
    };
  };


  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !user) {
      setError("Please select a resume file");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/resume/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      const data: ResumeResponse = await res.json();

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            <p className="mt-1 font-medium text-foreground break-all">
              {user.email}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">
                {loading
                  ? "Analyzing..."
                  : result
                  ? "Analysis complete"
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
          clearFile={() => setFile(null)}
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
        skillsCount={result.skills.length}
        sectionsCount={Object.keys(result.sections).length}
        quantification={result.quantification}
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