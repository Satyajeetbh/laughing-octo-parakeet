const parseSections = (text) => {
  if (!text || typeof text !== "string") {
    return {
      skills: "",
      experience: "",
      projects: "",
      education: ""
    }
  }

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)

  const sectionPatterns = {
    skills: [/^skills$/i, /^technical skills$/i, /^skills & tools$/i],
    experience: [/^experience$/i, /^work experience$/i, /^professional experience$/i],
    projects: [/^projects$/i, /^personal projects$/i, /^relevant projects$/i],
    education: [/^education$/i, /^academic background$/i]
  }

  const sections = {
    skills: [],
    experience: [],
    projects: [],
    education: []
  }

  let currentSection = null

  for (let line of lines) {
    let matchedSection = null

    for (let key in sectionPatterns) {
      if (sectionPatterns[key].some(pattern => pattern.test(line))) {
        matchedSection = key
        break
      }
    }

    if (matchedSection) {
      currentSection = matchedSection
      continue
    }

    if (currentSection) {
      sections[currentSection].push(line)
    }
  }

  return {
    skills: sections.skills.join("\n"),
    experience: sections.experience.join("\n"),
    projects: sections.projects.join("\n"),
    education: sections.education.join("\n")
  }
}

module.exports = parseSections