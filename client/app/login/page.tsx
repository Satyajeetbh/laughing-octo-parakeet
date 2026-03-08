"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/80">
                Placement Intel
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Know what your resume is really saying.
              </h1>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Analyze structure, extracted skills, and measurable impact in one place.
              </p>
            </div>

            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5">
              <p className="text-sm text-primary-foreground/80">
                Built for students who want stronger resumes, not guesswork.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <Card className="w-full max-w-md border-0 shadow-none">
              <CardContent className="p-0">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Login</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Access your dashboard and resume analysis.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-medium text-primary hover:underline">
                    Create one
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}