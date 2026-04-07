"use client";
type StatusProps = {
  processingStatus: "idle" | "uploading" | "queued" | "processing" | "completed" | "failed";
  error?: string;
  fileName?: string;
};
 
const statusMeta: Record<string, { label: string; color: string }> = {
  idle:       { label: "ready",      color: "var(--mid)" },
  uploading:  { label: "uploading",  color: "var(--mid)" },
  queued:     { label: "queued",     color: "var(--amber)" },
  processing: { label: "analyzing",  color: "var(--blue)" },
  completed:  { label: "complete",   color: "var(--green)" },
  failed:     { label: "failed",     color: "var(--red)" },
};
 
export function AnalysisStatusCard({ processingStatus, error, fileName }: StatusProps) {
  const meta = statusMeta[processingStatus] || statusMeta.idle;
 
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--faint)", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div>
        {fileName && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 320 }}>{fileName}</p>
        )}
        {error && processingStatus === "failed" && (
          <p style={{ fontSize: 12, color: "var(--red)", fontWeight: 300 }}>{error}</p>
        )}
      </div>
      <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: meta.color, whiteSpace: "nowrap" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: meta.color, display: "inline-block" }}/>
        {meta.label}
      </span>
    </div>
  );
}
 
export default AnalysisStatusCard;