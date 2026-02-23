const extractSkills = (skillsText) => {
  if (!skillsText) return []

  const cleaned = skillsText
    .replace(/skills:?/i, "")
    .replace(/\|/g, ",")
    .replace(/•/g, ",")
    .replace(/\//g, ",")
    .replace(/\s+/g, " ")
    .trim()

  const candidates = cleaned.split(",")

  const filtered = candidates
    .map(skill => skill.trim().toLowerCase())
    .filter(skill => 
      skill.length > 1 &&
      skill.length < 40 &&              // prevent long sentences
      !skill.includes("built") &&
      !skill.includes("developed") &&
      !skill.includes("completed") &&
      !skill.includes("implemented") &&
      !skill.includes("focused")
    )

  return [...new Set(filtered)]
}

module.exports = extractSkills
