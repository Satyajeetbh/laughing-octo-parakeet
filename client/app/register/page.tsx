"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterPage() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
    } catch (err: any) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-foreground p-10 text-background md:flex">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/70">
                Placement Intel
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Build a stronger profile with actual feedback.
              </h1>
              <p className="mt-4 max-w-md text-background/70">
                Create an account to upload your resume and start analyzing what recruiters may notice first.
              </p>
            </div>

            <div className="rounded-2xl border border-background/10 bg-background/10 p-5">
              <p className="text-sm text-background/70">
                Stop guessing whether your resume is good. Test it.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <Card className="w-full max-w-md border-0 shadow-none">
              <CardContent className="p-0">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Create account</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start using your resume analysis dashboard.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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
                      placeholder="Create a password"
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
                    {loading ? "Creating account..." : "Register"}
                  </Button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Login
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