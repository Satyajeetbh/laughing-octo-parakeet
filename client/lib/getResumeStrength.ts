export function getResumeStrength(score?: number | null) {
  if (typeof score !== "number") return null;

  if (score >= 75) {
    return {
      label: "Strong structure",
      variant: "default" as const,
    };
  }

  if (score >= 50) {
    return {
      label: "Decent foundation",
      variant: "secondary" as const,
    };
  }

  return {
    label: "Needs work",
    variant: "outline" as const,
  };
}