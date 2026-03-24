import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, UploadCloud, X } from "lucide-react";

type Props = {
  file: File | null;
  loading: boolean;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  clearFile: () => void;
};

const MAX_FILE_SIZE_MB = 5;

export default function ResumeUploadCard({
  file,
  loading,
  jobDescription,
  onJobDescriptionChange,
  onFileChange,
  onSubmit,
  clearFile,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState("");

  const validateFile = (selectedFile: File | null) => {
    if (!selectedFile) return false;

    if (selectedFile.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File size must be under ${MAX_FILE_SIZE_MB} MB.`);
      return false;
    }

    setFileError("");
    return true;
  };

  const handleSelectedFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (!validateFile(selectedFile)) {
      onFileChange(null);
      return;
    }

    onFileChange(selectedFile);
  };

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

    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleSelectedFile(droppedFile);
  };

  const handleClearFile = () => {
    setFileError("");
    clearFile();
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
          Upload a PDF resume to analyze sections, extracted skills, and
          quantification strength.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center transition ${
              dragActive
                ? "border-primary bg-primary/10"
                : "border-border bg-muted/30 hover:bg-muted"
            } ${loading ? "pointer-events-none opacity-70" : ""}`}
          >
            <UploadCloud className="mb-4 h-10 w-10 text-primary" />

            <span className="text-base font-semibold text-foreground">
              Drag and drop your resume here
            </span>

            <span className="mt-2 text-sm text-muted-foreground">
              or click to browse from your device
            </span>

            <span className="mt-1 text-xs text-muted-foreground">
              PDF only • Max {MAX_FILE_SIZE_MB} MB
            </span>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              disabled={loading}
              onChange={(e) =>
                handleSelectedFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {fileError && (
            <Alert variant="destructive">
              <AlertDescription>{fileError}</AlertDescription>
            </Alert>
          )}

          {file && (
            <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Selected file
                  </p>
                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {file.name} • {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClearFile}
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <label
              htmlFor="jobDescription"
              className="text-sm font-medium text-foreground"
            >
              Job Description (optional)
            </label>

            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
              placeholder="Paste a job description here to get role-specific keyword matching and missing-skill insights."
              disabled={loading}
              rows={6}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
            />

            <p className="text-xs text-muted-foreground">
              Add a JD to compare your resume against a target role.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="submit"
              disabled={loading || !file}
              className="sm:w-auto"
            >
              {loading ? "Analyzing..." : "Upload Resume"}
            </Button>

            {file && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearFile}
                disabled={loading}
              >
                Clear file
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
