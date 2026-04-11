import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Action = {
  action: string;
  impact: "high" | "medium" | "low";
  reason: string;
};

type Props = {
  actions?: Action[];
};

function impactVariant(impact: Action["impact"]) {
  if (impact === "high") return "destructive";
  if (impact === "medium") return "secondary";
  return "outline";
}

export default function PriorityActionsCard({ actions = [] }: Props) {
  if (!actions.length) return null;

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Top Priority Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {actions.map((item, idx) => (
          <div key={`${item.action}-${idx}`} className="rounded-xl border border-border p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-foreground">{item.action}</p>
              <Badge variant={impactVariant(item.impact)} className="rounded-full">
                {item.impact}
              </Badge>
            </div>
            {item.reason ? (
              <p className="mt-2 text-sm text-muted-foreground">{item.reason}</p>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}