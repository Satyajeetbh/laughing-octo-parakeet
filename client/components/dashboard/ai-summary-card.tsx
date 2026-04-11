import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  summary?: string;
  confidence?: number;
  model?: string;
  isFallback?: boolean;
};

export default function AISummaryCard({
  summary,
  confidence,
  model,
  isFallback,
}: Props) {
  if (!summary) return null;

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg">AI Summary</CardTitle>
          {typeof confidence === "number" && (
            <Badge variant="secondary" className="rounded-full">
              Confidence: {Math.round(confidence * 100)}%
            </Badge>
          )}
          {model && (
            <Badge variant="outline" className="rounded-full">
              Model: {model}
            </Badge>
          )}
          {isFallback && (
            <Badge variant="destructive" className="rounded-full">
              Fallback
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}