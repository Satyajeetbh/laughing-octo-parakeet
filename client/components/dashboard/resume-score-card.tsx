import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Quantification = {
  total_bullets: number;
  quantified_bullets: number;
  percentage_mentions: number;
  number_mentions: number;
};

type Props = {
  skillsCount: number;
  sectionsCount: number;
  quantification: Quantification;
};

export default function ResumeScoreCard({
  skillsCount,
  sectionsCount,
  quantification,
}: Props) {
  const sectionScore = Math.min((sectionsCount / 6) * 100, 100);
  const skillScore = Math.min((skillsCount / 12) * 100, 100);

  const quantifiedRatio =
    quantification.total_bullets > 0
      ? (quantification.quantified_bullets / quantification.total_bullets) * 100
      : 0;

  const impactScore = Math.min(
    quantifiedRatio * 0.6 +
      Math.min(quantification.number_mentions * 8, 20) +
      Math.min(quantification.percentage_mentions * 10, 20),
    100
  );

  const overallScore = Math.round(
    sectionScore * 0.35 + skillScore * 0.3 + impactScore * 0.35
  );

  const getLabel = () => {
    if (overallScore >= 80) {
      return { text: "Strong structure", variant: "default" as const };
    }

    if (overallScore >= 55) {
      return { text: "Decent foundation", variant: "secondary" as const };
    }

    return { text: "Needs work", variant: "outline" as const };
  };

  const label = getLabel();

  return (
    <Card className="rounded-3xl border-border">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Resume Score</CardTitle>
            <CardDescription>
              A quick visual summary based on structure, skills, and measurable impact.
            </CardDescription>
          </div>

          <Badge variant={label.variant} className="rounded-full">
            {label.text}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Overall score</p>
              <p className="mt-2 text-4xl font-bold text-foreground">{overallScore}/100</p>
            </div>
            <p className="text-sm text-muted-foreground">
              based on current extracted data
            </p>
          </div>

          <Progress value={overallScore} className="mt-4 h-3" />
        </div>

        <div className="grid gap-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Section coverage</p>
              <p className="text-sm text-muted-foreground">{Math.round(sectionScore)}%</p>
            </div>
            <Progress value={sectionScore} className="h-2" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Skills presence</p>
              <p className="text-sm text-muted-foreground">{Math.round(skillScore)}%</p>
            </div>
            <Progress value={skillScore} className="h-2" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Impact / quantification</p>
              <p className="text-sm text-muted-foreground">{Math.round(impactScore)}%</p>
            </div>
            <Progress value={impactScore} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}