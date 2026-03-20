"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeHistoryItem, ResumeResult } from "@/types/resume";

type AuthUser = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

type UploadResponse = {
  message: string;
  resumeId: string;
  jobId: string;
  processingStatus: "queued" | "processing" | "completed" | "failed";
};

type ProcessingStatus =
  | "idle"
  | "uploading"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export function useResumeAnalysis(user: AuthUser | null) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
const [isOpeningHistory, setIsOpeningHistory] = useState(false);
  const [resumeId, setResumeId] = useState("");
  const [processingStatus, setProcessingStatus] =
    useState<ProcessingStatus>("idle");

  const [history, setHistory] = useState<ResumeHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const clearPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const fetchResumeHistory = async () => {
    if (!user) return;

    setHistoryLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/resume`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch resume history");
      }

      setHistory(data);
    } catch (err: any) {
      setError(err.message || "Failed to load resume history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchResumeResult = async (id: string) => {
    if (!user) return;

    const res = await fetch(`${apiUrl}/api/resume/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch resume result");
    }

    setResumeId(id);
    setResult(data);
    setProcessingStatus(data.processingStatus || "completed");
  };

  const pollResumeStatus = (id: string) => {
    clearPolling();

    pollingRef.current = setInterval(async () => {
      try {
        if (!user) {
          clearPolling();
          return;
        }

        const res = await fetch(`${apiUrl}/api/resume/${id}/status`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch status");
        }

        setProcessingStatus(data.processingStatus);

        if (data.processingStatus === "completed") {
          clearPolling();
          await fetchResumeResult(id);
          await fetchResumeHistory();
        }

        if (data.processingStatus === "failed") {
          clearPolling();
          setError(data.errorMessage || "Resume processing failed");
          setProcessingStatus("failed");
          await fetchResumeHistory();
        }
      } catch (err: any) {
        clearPolling();
        setError(err.message || "Status polling failed");
        setProcessingStatus("failed");
      }
    }, 2500);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !user) {
      setError("Please select a resume file");
      return;
    }

    setError("");
    setIsUploading(true);
    setResult(null);
    setResumeId("");
    setProcessingStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${apiUrl}/api/resume/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data: UploadResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setResumeId(data.resumeId);
      setProcessingStatus(data.processingStatus);
      await fetchResumeHistory();
      pollResumeStatus(data.resumeId);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setProcessingStatus("failed");
    } finally {
      setIsUploading(false);
    }
  };

  const loadResumeFromHistory = async (id: string) => {
  if (!user) return;

  try {
    setError("");
    setIsOpeningHistory(true);
    await fetchResumeResult(id);
  } catch (err: any) {
    setError(err.message || "Failed to open resume result");
  } finally {
    setIsOpeningHistory(false);
  }
};

  const clearSelectedFile = () => {
    setFile(null);
  };

  useEffect(() => {
  return () => {
    clearPolling();
  };
}, []);

  useEffect(() => {
    if (user) {
      fetchResumeHistory();
    }
  }, [user]);

  return {
    file,
    setFile,
    clearSelectedFile,
    result,
    error,
    isUploading,
    isOpeningHistory,
    resumeId,
    processingStatus,
    history,
    historyLoading,
    handleUpload,
    loadResumeFromHistory,
    fetchResumeHistory,
  };
}