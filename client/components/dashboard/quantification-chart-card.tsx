import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  totalBullets: number;
  quantifiedBullets: number;
  percentageMentions: number;
  numberMentions: number;
};

export default function QuantificationChartCard({
  totalBullets,
  quantifiedBullets,
  percentageMentions,
  numberMentions,
}: Props) {
  const quantifiedPercent =
    totalBullets > 0 ? Math.round((quantifiedBullets / totalBullets) * 100) : 0;

  const numberMentionsScore = Math.min(numberMentions * 10, 100);
  const percentageMentionsScore = Math.min(percentageMentions * 20, 100);

  const bars = [
    {
      label: "Quantified bullets ratio",
      value: quantifiedPercent,
      helper: `${quantifiedBullets}/${totalBullets || 0} bullets`,
    },
    {
      label: "Number mentions strength",
      value: numberMentionsScore,
      helper: `${numberMentions} numeric mentions`,
    },
    {
      label: "Percentage mentions strength",
      value: percentageMentionsScore,
      helper: `${percentageMentions} percentage mentions`,
    },
  ];

  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle>Quantification Breakdown</CardTitle>
        <CardDescription>
          Visual indicators showing how much measurable impact appears in the resume.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{bar.label}</p>
                <p className="text-xs text-muted-foreground">{bar.helper}</p>
              </div>
              <p className="text-sm font-medium text-foreground">{bar.value}%</p>
            </div>
            <Progress value={bar.value} className="h-2" />
          </div>
        ))}

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Total Bullets</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{totalBullets}</p>
          </div>

          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Quantified Bullets</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{quantifiedBullets}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}