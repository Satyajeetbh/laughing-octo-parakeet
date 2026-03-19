"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [isAuthLoading, user, router]);

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}