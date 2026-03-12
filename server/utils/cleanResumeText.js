const cleanResumeText = (rawText = "") => {
  return rawText
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[•●▪◦]/g, "•")
    .replace(/[‐-–—]/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
};

module.exports = cleanResumeText;