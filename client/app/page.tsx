import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="grid w-full gap-10 rounded-3xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              AI resume analysis tool
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              ResumeIntel
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Upload your resume, analyze structure and skills, and get a clearer
              picture of how strong your profile looks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/register">Get Started</Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>

          <Card className="rounded-2xl border-border bg-muted/40 shadow-sm">
            <CardHeader>
              <CardTitle>What it checks</CardTitle>
              <CardDescription>
                A quick breakdown of what the analyzer currently evaluates.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">Resume metrics</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Word count, character count, and structural completeness.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">Skill extraction</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Detects technical skills and highlights what is actually present.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">Quantification signals</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Checks whether your bullets include numbers, metrics, and impact.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}