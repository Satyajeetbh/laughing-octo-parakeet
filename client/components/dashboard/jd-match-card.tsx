import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Job Description Match</CardTitle>
        <CardDescription>
          Shows how well your resume aligns with the provided job description.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Match percentage</p>
          <p className="mt-2 text-4xl font-bold text-foreground">
            {matchPercentage}%
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">
            Matched keywords
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="rounded-full">
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No matched keywords found.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">
            Missing keywords
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="rounded-full">
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No missing keywords detected.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}