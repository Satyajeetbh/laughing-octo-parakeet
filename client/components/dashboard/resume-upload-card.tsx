import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, UploadCloud, X } from "lucide-react";

type Props = {
  file: File | null;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  clearFile: () => void;
};

export default function ResumeUploadCard({
  file,
  loading,
  onFileChange,
  onSubmit,
  clearFile,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = () => {
  setDragActive(false);
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setDragActive(false);

  const droppedFile = e.dataTransfer.files?.[0];

  if (!droppedFile) return;

  if (droppedFile.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  onFileChange(droppedFile);
};

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload a PDF resume to analyze sections, extracted skills, and quantification strength.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <label
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center transition
  ${
    dragActive
      ? "border-primary bg-primary/10"
      : "border-border bg-muted/30 hover:bg-muted"
  }`}
>
            <UploadCloud className="mb-4 h-10 w-10 text-primary" />

            <span className="text-base font-semibold text-foreground">
              Drag and drop your resume here
            </span>

            <span className="mt-2 text-sm text-muted-foreground">
              or click to browse from your device
            </span>

            <span className="mt-1 text-xs text-muted-foreground">
              PDF only
            </span>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) =>
                onFileChange(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {file && (
            <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Selected file</p>
                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {file.name} • {formatFileSize(file.size)}

                  </p>
                </div>
              </div>

              <Button type="button" variant="ghost" size="icon" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={loading} className="sm:w-auto">
              {loading ? "Analyzing..." : "Upload Resume"}
            </Button>

            {file && (
              <Button type="button" variant="outline" onClick={clearFile}>
                Clear file
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}