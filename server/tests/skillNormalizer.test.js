const normalizeSkills = require("../utils/skillNormalizer");

describe("skillNormalizer", () => {
  test("normalizes common skill variants", () => {
    const input = ["ReactJS", "nodejs", "Tailwind", "REST APIs", "VSCode"];
    const result = normalizeSkills(input);

    expect(result).toContain("react");
    expect(result).toContain("node.js");
    expect(result).toContain("tailwind css");
    expect(result).toContain("rest api");
    expect(result).toContain("vs code");
  });

  test("filters invalid generic tokens", () => {
    const input = ["design", "development", "tools", "frameworks", "React"];
    const result = normalizeSkills(input);

    expect(result).not.toContain("design");
    expect(result).not.toContain("development");
    expect(result).not.toContain("tools");
    expect(result).not.toContain("frameworks");
    expect(result).toContain("react");
  });

  test("deduplicates canonical forms", () => {
    const input = ["React", "reactjs", "react.js"];
    const result = normalizeSkills(input);

    expect(result.filter((s) => s === "react")).toHaveLength(1);
  });
});