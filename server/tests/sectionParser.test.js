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
});