import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function formatSectionLabel(section: string) {
  return section
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SectionsCard({ sections }: { sections: string[] }) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle>Detected Sections</CardTitle>
        <CardDescription>
          Sections actually found in the resume content.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {sections.length > 0 ? (
            sections.map((section) => (
              <Badge key={section} variant="secondary">
                {formatSectionLabel(section)}
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