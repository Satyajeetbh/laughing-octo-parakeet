const extractSkills = require("../utils/skillExtractor");

describe("skillExtractor", () => {
  test("extracts known skills from text", () => {
    const text = `
      Built a dashboard using React, Next.js, Node.js, MongoDB, Docker and Tailwind CSS.
      Added authentication and REST APIs.
    `;

    const result = extractSkills(text);

    expect(result).toContain("react");
    expect(result).toContain("next.js");
    expect(result).toContain("node.js");
    expect(result).toContain("mongodb");
    expect(result).toContain("docker");
    expect(result).toContain("tailwind css");
    expect(result).toContain("authentication");
    expect(result).toContain("rest api");
  });

  test("does not extract random junk words", () => {
    const text = `
      Built a stock market tracker with better design and smooth experience.
      Worked under Abhay Maurya in 2024.
    `;

    const result = extractSkills(text);

    expect(result).not.toContain("stock");
    expect(result).not.toContain("market");
    expect(result).not.toContain("design");
    expect(result).not.toContain("abhay");
  });
});