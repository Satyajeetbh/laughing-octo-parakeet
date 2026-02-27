"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type ResumeResponse = {
  wordCount: number;
  charCount: number;
  skills: string[];
  quantification: {
    total_bullets: number;
    quantified_bullets: number;
    percentage_mentions: number;
    number_mentions: number;
  };
  sections: Record<string, string>;
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !user) {
      setError("Please select a resume file");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file); // matches multer field name

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/resume/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`, // exact format
          },
          body: formData,
        }
      );

      const data: ResumeResponse = await res.json();

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {user.name}
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleUpload} className="mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
            className="mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Upload Resume"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {result && (
          <div className="space-y-6">
            <div className="bg-yellow-100 text-black p-4 rounded">
              <p><strong>Word Count:</strong> {result.wordCount}</p>
              <p><strong>Character Count:</strong> {result.charCount}</p>
              <div>
                <p><strong>Quantification Score:</strong></p>
                <div className="space-y-1">
                  <p>Total Bullets: {result.quantification.total_bullets}</p>
                  <p>Quantified Bullets: {result.quantification.quantified_bullets}</p>
                  <p>Percentage Mentions: {result.quantification.percentage_mentions}</p>
                  <p>Number Mentions: {result.quantification.number_mentions}</p>
                </div></div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h2 className="font-semibold mb-2">Detected Sections</h2>
              <div className="flex flex-wrap gap-2">
                {Object.keys(result.sections).map((section, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h2 className="font-semibold mb-2">Extracted Skills</h2>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}