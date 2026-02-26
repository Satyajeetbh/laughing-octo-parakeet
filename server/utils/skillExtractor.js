const extractSkills = (skillsText) => {
  if (!skillsText || typeof skillsText !== "string") return [];

  // Remove common section headers
  const headersToIgnore = [
    "languages",
    "frameworks",
    "frameworks/libraries",
    "libraries",
    "databases",
    "tools",
    "tools/platforms",
    "other"
  ];

  const lines = skillsText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  let skills = [];

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();

    // Skip headers
    if (headersToIgnore.includes(lowerLine)) return;

    // Split by comma OR multiple spaces
    const parts = line.split(/,|\s{2,}|\s(?=[A-Z])/);

    parts.forEach(part => {
      const cleaned = part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9.+#]/g, "");

      if (
        cleaned.length > 1 &&
        cleaned.length < 30 &&
        !headersToIgnore.includes(cleaned)
      ) {
        skills.push(cleaned);
      }
    });
  });

  // Remove duplicates
  return [...new Set(skills)];
};

module.exports = extractSkills;