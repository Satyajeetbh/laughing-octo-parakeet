const parseSections = require("../utils/sectionParser");

describe("sectionParser", () => {
  test("parses standard resume sections", () => {
    const text = `
SKILLS
JavaScript React Node.js

PROJECTS
Resume Analyzer
•Built a full-stack analyzer.

CERTIFICATIONS
AWS Cloud Practitioner

TRAINING
Backend Bootcamp

EDUCATION
B.Tech CSE
    `.trim();

    const sections = parseSections(text);

    expect(sections.skills).toContain("JavaScript");
    expect(sections.projects).toContain("Resume Analyzer");
    expect(sections.certifications).toContain("AWS Cloud Practitioner");
    expect(sections.training).toContain("Backend Bootcamp");
    expect(sections.education).toContain("B.Tech CSE");
  });

  test("supports nonstandard heading aliases", () => {
    const text = `
CORE COMPETENCIES
React Node.js Docker

ACADEMIC PROJECTS
Smart Attendance System

EMPLOYMENT HISTORY
Software Intern
    `.trim();

    const sections = parseSections(text);

    expect(sections.skills).toContain("React");
    expect(sections.projects).toContain("Smart Attendance System");
    expect(sections.experience).toContain("Software Intern");
  });

  test("ignores pre-heading name and contact lines without crashing", () => {
    const text = `
HARSH CHANDRAWANHI
harsh@email.com
+91 9999999999
linkedin.com/in/harsh

SKILLS
JavaScript React

PROJECTS
ResumeIntel
Built a resume analyzer
    `.trim();

    const sections = parseSections(text);

    expect(sections.skills).toContain("JavaScript");
    expect(sections.projects).toContain("ResumeIntel");
    expect(sections.summary).toBe("");
    expect(sections.experience).toBe("");
  });

  test("captures section order in the order headings appear", () => {
    const text = `
SKILLS
JavaScript React

PROJECTS
ResumeIntel

EDUCATION
B.Tech CSE
    `.trim();

    const sections = parseSections(text);

    expect(sections._sectionOrder).toEqual([
      "skills",
      "projects",
      "education",
    ]);
  });

  test("does not treat bullet lines as section headings", () => {
    const text = `
PROJECTS
ResumeIntel
• Built a resume analyzer
• Improved parsing accuracy
    `.trim();

    const sections = parseSections(text);

    expect(sections.projects).toContain("ResumeIntel");
    expect(sections.projects).toContain("• Built a resume analyzer");
    expect(sections.projects).toContain("• Improved parsing accuracy");
    expect(sections.skills).toBe("");
  });

  test("returns empty strings for missing sections", () => {
    const text = `
SKILLS
JavaScript React Node.js
    `.trim();

    const sections = parseSections(text);

    expect(sections.summary).toBe("");
    expect(sections.skills).toContain("JavaScript");
    expect(sections.experience).toBe("");
    expect(sections.projects).toBe("");
    expect(sections.education).toBe("");
    expect(sections.certifications).toBe("");
    expect(sections.training).toBe("");
    expect(sections.achievements).toBe("");
  });

  test("detects uppercase headings correctly", () => {
    const text = `
EXPERIENCE
Software Engineer Intern

PROJECTS
ResumeIntel
    `.trim();

    const sections = parseSections(text);

    expect(sections.experience).toContain("Software Engineer Intern");
    expect(sections.projects).toContain("ResumeIntel");
  });

  test("does not mistake short content lines for valid section headings", () => {
    const text = `
PROJECTS
Portfolio Website
Open Source Contributions
Built with React and Next.js

EDUCATION
B.Tech CSE
    `.trim();

    const sections = parseSections(text);

    expect(sections.projects).toContain("Portfolio Website");
    expect(sections.projects).toContain("Open Source Contributions");
    expect(sections.projects).toContain("Built with React and Next.js");
    expect(sections.education).toContain("B.Tech CSE");
  });
});