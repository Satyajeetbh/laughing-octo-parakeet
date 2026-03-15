const calculateResumeScore = require("../utils/resumeScorer");

describe("resumeScorer", () => {
  test("gives a reasonable score for a strong software resume", () => {
    const result = calculateResumeScore({
      total_bullets: 8,
      quantified_bullets: 4,
      skills: ["javascript", "typescript", "react", "node.js", "docker", "mongodb", "git"],
      wordCount: 420,
      textToAnalyze: `
•Built a Node.js API serving 10k users
•Implemented authentication using JWT
•Optimized response time by 30%
•Deployed app with Docker
      `,
      sections: {
        skills: "JavaScript React Node.js Docker",
        projects: "Project content",
        education: "B.Tech",
        experience: "Internship",
      },
    });

    expect(result.totalScore).toBeGreaterThanOrEqual(60);
  });

  test("gives a lower score for a weak sparse resume", () => {
    const result = calculateResumeScore({
      total_bullets: 1,
      quantified_bullets: 0,
      skills: ["html", "css"],
      wordCount: 120,
      textToAnalyze: "•Made a website",
      sections: {
        skills: "HTML CSS",
        projects: "",
        education: "B.Tech",
        experience: "",
      },
    });

    expect(result.totalScore).toBeLessThan(60);
  });
});