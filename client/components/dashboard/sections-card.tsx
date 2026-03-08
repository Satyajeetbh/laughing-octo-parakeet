import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SectionsCard({ sections }: { sections: string[] }) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle>Detected Sections</CardTitle>
        <CardDescription>
          Sections identified in the resume.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {sections.length > 0 ? (
            sections.map((s, i) => (
              <Badge key={i} variant="secondary">
                {s}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No sections detected
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}