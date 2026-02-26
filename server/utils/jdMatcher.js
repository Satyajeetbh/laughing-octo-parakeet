const normalizeSkills = require("./skillNormalizer");

const stopWords = [
  "the","and","with","for","you","will",
  "are","have","our","this","that",
  "from","your","into","using","about",
  "looking","developer","experience",
  "responsible","requirements","role"
];

const tier1 = [
  "react","node.js","next.js","typescript",
  "javascript","python","java",
  "mongodb","mysql"
];

const tier2 = [
  "docker","git","linux","postman",
  "rest api","authentication","mvc"
];

const tier3 = [
  "design","system","application",
  "architecture","development"
];

const getWeight = (keyword) => {
  if (tier1.includes(keyword)) return 5;
  if (tier2.includes(keyword)) return 3;
  if (tier3.includes(keyword)) return 1;
  return 2;
};

const extractJDKeywords = (jdText) => {
  const words = jdText
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const filtered = words.filter(
    word => word.length > 2 && !stopWords.includes(word)
  );

  return [...new Set(filtered)];
};

const matchResumeToJD = (resumeSkills, jdText) => {
  // 1️⃣ Extract raw JD words
  let jdKeywords = extractJDKeywords(jdText);

  // 2️⃣ Normalize JD using SAME normalizer
  jdKeywords = normalizeSkills(jdKeywords);

  const resumeSet = new Set(resumeSkills);

  let totalWeight = 0;
  let matchedWeight = 0;

  const matchedKeywords = [];
  const missingKeywords = [];

  jdKeywords.forEach(keyword => {
    const weight = getWeight(keyword);
    (keyword) ? 1 : 3;

    totalWeight += weight;

    if (resumeSet.has(keyword)) {
      matchedWeight += weight;
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const matchPercentage =
    totalWeight > 0
      ? Math.round((matchedWeight / totalWeight) * 100)
      : 0;

  return {
    matchPercentage,
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 10)
  };
};

module.exports = matchResumeToJD;