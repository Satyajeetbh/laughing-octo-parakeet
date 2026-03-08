import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SkillsCard({ skills }: { skills: string[] }) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle>Extracted Skills</CardTitle>
        <CardDescription>
          Technical skills identified in your resume.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <Badge key={i}>{skill}</Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No skills detected
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}