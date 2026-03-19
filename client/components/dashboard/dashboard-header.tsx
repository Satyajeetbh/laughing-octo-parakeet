import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, LogOut } from "lucide-react";

type Props = {
  name: string;
  onLogout: () => void;
};

export default function DashboardHeader({ name, onLogout }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome, {name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your resume and review structure, skills, and measurable impact signals.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
          ResumeIntel
        </Badge>
      </div>

      <Button variant="outline" onClick={onLogout} className="w-full md:w-auto">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}