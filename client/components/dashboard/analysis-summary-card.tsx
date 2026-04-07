import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Strength = {
  label: string;
  variant: "default" | "secondary" | "outline" | "destructive";
} | null;

type Props = {
  finalScore: number;
  resumeScore: number;
  skillsCount: number;
  hasJDMatch: boolean;
  strength: Strength;
};

export default function AnalysisSummaryCard({
  finalScore,
  resumeScore,
  skillsCount,
  hasJDMatch,
  strength,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Analysis</p>

            <h2 className="text-2xl font-bold text-foreground">
              Final Score: {finalScore}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Resume score: {resumeScore} • Skills detected: {skillsCount}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {hasJDMatch
                ? "Final score includes both resume quality and job-description match."
                : "No job description was provided, so final score is based only on resume analysis."}
            </p>
          </div>

          {strength && (
            <Badge variant={strength.variant} className="rounded-full">
              {strength.label}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}