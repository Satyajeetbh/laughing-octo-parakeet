const detectQuantification = require("../utils/quantificationDetector");

describe("quantificationDetector", () => {
  test("detects quantified bullets correctly", () => {
    const text = `
•Built an API serving 10k users
•Reduced response time by 35%
•Developed authentication module
    `.trim();

    const result = detectQuantification(text);

    expect(result.total_bullets).toBe(3);
    expect(result.quantified_bullets).toBe(2);
    expect(result.percentage_mentions).toBe(1);
    expect(result.number_mentions).toBeGreaterThanOrEqual(1);
  });

  test("ignores years and date formats as impact", () => {
    const text = `
•Worked at company in 2024
•Completed training during 06/2024
    `.trim();

    const result = detectQuantification(text);

    expect(result.total_bullets).toBe(2);
    expect(result.quantified_bullets).toBe(0);
  });
});