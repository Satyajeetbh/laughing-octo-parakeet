"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Rewrite = {
  original: string;
  rewritten: string;
  rationale: string;
  confidence: number;
};

type Props = {
  rewrites?: Rewrite[];
};

export default function RewriteSuggestionsCard({ rewrites = [] }: Props) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!rewrites.length) return null;

  const copyText = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {
      setCopiedIdx(null);
    }
  };

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Rewrite Suggestions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {rewrites.map((item, idx) => (
          <div key={`${item.original}-${idx}`} className="rounded-xl border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Original
            </p>
            <p className="mt-1 text-sm text-foreground">{item.original}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Rewritten
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{item.rewritten}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Confidence: {Math.round((item.confidence || 0) * 100)}%
              </Badge>

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() => copyText(item.rewritten, idx)}
              >
                {copiedIdx === idx ? "Copied!" : "Copy rewritten bullet"}
              </Button>
            </div>

            {item.rationale ? (
              <p className="mt-3 text-xs text-muted-foreground">{item.rationale}</p>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}