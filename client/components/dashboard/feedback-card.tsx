import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  items: string[];
};

export default function FeedbackCard({ title, description, items }: Props) {
  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items available.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${title}-${index}`}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}