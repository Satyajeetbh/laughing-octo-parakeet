import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ScoreBreakdown = {
  sectionCompletenessScore: number;
  technicalSkillScore: number;
  bulletStructureScore: number;
  quantifiedImpactScore: number;
  actionVerbScore: number;
  lengthScore: number;
  projectExperienceTechScore: number;
};

type Props = {
  resumeScore: number;
  scoreBreakdown: ScoreBreakdown;
};

export default function ResumeScoreCard({
  resumeScore,
  scoreBreakdown,
}: Props) {
  const getLabel = () => {
    if (resumeScore >= 75) {
      return { text: "Strong structure", variant: "default" as const };
    }

    if (resumeScore >= 50) {
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
              Backend-calculated score based on structure, skills, bullets, impact, and project signals.
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
              <p className="mt-2 text-4xl font-bold text-foreground">
                {resumeScore}/100
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              calculated by backend scoring engine
            </p>
          </div>

          <Progress value={resumeScore} className="mt-4 h-3" />
        </div>

        <div className="grid gap-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Section completeness
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.sectionCompletenessScore}/15
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.sectionCompletenessScore / 15) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Technical skills
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.technicalSkillScore}/25
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.technicalSkillScore / 25) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Bullet structure
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.bulletStructureScore}/15
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.bulletStructureScore / 15) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Quantified impact
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.quantifiedImpactScore}/20
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.quantifiedImpactScore / 20) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Action verbs
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.actionVerbScore}/10
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.actionVerbScore / 10) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Length
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.lengthScore}/5
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.lengthScore / 5) * 100}
              className="h-2"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Project/experience tech depth
              </p>
              <p className="text-sm text-muted-foreground">
                {scoreBreakdown.projectExperienceTechScore}/10
              </p>
            </div>
            <Progress
              value={(scoreBreakdown.projectExperienceTechScore / 10) * 100}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}