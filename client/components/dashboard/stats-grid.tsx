import { Card, CardContent } from "@/components/ui/card";
import { FileText, Type, BrainCircuit, ListChecks } from "lucide-react";

type Props = {
  wordCount: number;
  charCount: number;
  skillsCount: number;
  sectionsCount: number;
};

export default function StatsGrid({
  wordCount,
  charCount,
  skillsCount,
  sectionsCount,
}: Props) {
  const stats = [
    {
      label: "Word Count",
      value: wordCount,
      icon: FileText,
    },
    {
      label: "Character Count",
      value: charCount,
      icon: Type,
    },
    {
      label: "Skills Found",
      value: skillsCount,
      icon: BrainCircuit,
    },
    {
      label: "Sections Found",
      value: sectionsCount,
      icon: ListChecks,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} className="rounded-2xl border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}