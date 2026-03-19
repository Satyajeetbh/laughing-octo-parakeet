import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeHistoryItem } from "@/types/resume";

type Props = {
  history: ResumeHistoryItem[];
  historyLoading: boolean;
  actionLoading: boolean;
  activeResumeId: string;
  onOpenResume: (id: string) => void;
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "Not processed yet";
  return new Date(dateString).toLocaleString();
};

const getStatusBadgeVariant = (
  status: ResumeHistoryItem["processingStatus"],
) => {
  if (status === "completed") return "default";
  if (status === "processing" || status === "queued") return "secondary";
  return "destructive";
};

export default function ResumeHistoryCard({
  history,
  historyLoading,
  actionLoading,
  activeResumeId,
  onOpenResume,
}: Props) {
  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader>
        <CardTitle>Resume History</CardTitle>
        <CardDescription>
          Review previous resume analyses and reopen any result.
        </CardDescription>
      </CardHeader>

      <CardContent>
  {historyLoading ? (
    <p className="text-sm text-muted-foreground">Loading history...</p>
  ) : history.length === 0 ? (
    <p className="text-sm text-muted-foreground">
      No resume analyses yet.
    </p>
  ) : (
    <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
      {history.map((item) => (
        <div
          key={item._id}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <p className="break-all font-medium text-foreground">
              {item.fileName || "Untitled resume"}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getStatusBadgeVariant(item.processingStatus)}>
                {item.processingStatus}
              </Badge>

              {typeof item.finalScore === "number" && (
                <Badge variant="outline">Score: {item.finalScore}</Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Processed: {formatDate(item.processedAt || item.createdAt)}
            </p>
          </div>

          <Button
            variant={activeResumeId === item._id ? "secondary" : "outline"}
            onClick={() => onOpenResume(item._id)}
            disabled={actionLoading || item.processingStatus !== "completed"}
          >
            {item.processingStatus !== "completed"
              ? "Unavailable"
              : activeResumeId === item._id
              ? "Currently Open"
              : "Open Result"}
          </Button>
        </div>
      ))}
    </div>
  )}
</CardContent>
    </Card>
  );
}
