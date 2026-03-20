import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
};

export default function JDMatchCard({
  matchPercentage,
  matchedKeywords,
  missingKeywords,
}: Props) {
  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader>
        <CardTitle>Job Description Match</CardTitle>
        <CardDescription>
          Keyword alignment between the uploaded resume and job description.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Match Percentage</p>
          <p className="text-2xl font-bold text-foreground">{matchPercentage}%</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Matched Keywords</p>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.length === 0 ? (
              <p className="text-sm text-muted-foreground">No matched keywords.</p>
            ) : (
              matchedKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                </Badge>
              ))
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Missing Keywords</p>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length === 0 ? (
              <p className="text-sm text-muted-foreground">No missing keywords.</p>
            ) : (
              missingKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline">
                  {keyword}
                </Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}