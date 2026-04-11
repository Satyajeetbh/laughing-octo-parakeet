import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeComparison } from "@/types/resume";

type Props = {
  comparison: ResumeComparison | null;
  loading?: boolean;
};

function deltaText(value: number) {
  return `${value > 0 ? "+" : ""}${value}`;
}

function deltaVariant(value: number): "default" | "secondary" | "destructive" | "outline" {
  if (value > 0) return "default";
  if (value < 0) return "destructive";
  return "secondary";
}

export default function ResumeComparisonCard({ comparison, loading }: Props) {
  if (loading) {
    return (
      <Card className="rounded-2xl border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Version Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading comparison...</p>
        </CardContent>
      </Card>
    );
  }

  if (!comparison) return null;

  const { deltas, skills } = comparison;

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Version Comparison</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={deltaVariant(deltas.finalScore)} className="rounded-full">
            Final Score {deltaText(deltas.finalScore)}
          </Badge>
          <Badge variant={deltaVariant(deltas.ruleScore)} className="rounded-full">
            Rule Score {deltaText(deltas.ruleScore)}
          </Badge>
          <Badge variant={deltaVariant(deltas.aiScore)} className="rounded-full">
            AI Score {deltaText(deltas.aiScore)}
          </Badge>
          <Badge variant={deltaVariant(deltas.quantifiedBullets)} className="rounded-full">
            Quantified Bullets {deltaText(deltas.quantifiedBullets)}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border p-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Skills Added</p>
            {skills.added.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.added.map((skill) => (
                  <Badge key={`add-${skill}`} variant="default" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No new skills detected.</p>
            )}
          </div>

          <div className="rounded-xl border border-border p-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Skills Removed</p>
            {skills.removed.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.removed.map((skill) => (
                  <Badge key={`remove-${skill}`} variant="outline" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No removed skills.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}