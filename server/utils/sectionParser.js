const normalizeHeading = (line) =>
  line
    .toLowerCase()
    .replace(/[:|]/g, "")
    .replace(/[-=*#~_]{2,}/g, "") // strip decorative repeated chars like --- or ===
    .replace(/[^\w\s&/+.-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const sectionAliases = {
  summary: [
    "summary",
    "professional summary",
    "profile",
    "career summary",
    "about me",
    "objective",
    "career objective",
    "professional profile",
  ],
  skills: [
    "skills",
    "technical skills",
    "skills & tools",
    "skills and tools",
    "tools & technologies",
    "tools and technologies",
    "technologies",
    "tech stack",
    "core competencies",
    "technical proficiencies",
    "languages",
    "frameworks",
    "developer skills",
    "key skills",
    "areas of expertise",
    "expertise",
  ],
  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
    "internships",
    "internship experience",
    "work history",
    "career history",
    "positions held",
    "relevant experience",
  ],
  projects: [
    "projects",
    "personal projects",
    "relevant projects",
    "academic projects",
    "project experience",
    "side projects",
    "open source",
    "portfolio",
    "notable projects",
  ],
  education: [
    "education",
    "academic background",
    "academic qualifications",
    "education and coursework",
    "qualifications",
    "degrees",
    "educational background",
  ],
  certifications: [
    "certifications",
    "certification",
    "licenses & certifications",
    "licenses and certifications",
    "credentials",
    "professional certifications",
  ],
  training: [
    "training",
    "trainings",
    "courses",
    "coursework",
    "professional development",
    "workshops",
  ],
  achievements: [
    "achievements",
    "awards",
    "accomplishments",
    "honors",
    "honors & awards",
    "honors and awards",
    "recognition",
  ],
};

const createEmptySections = () => ({
  summary: [],
  skills: [],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  training: [],
  achievements: [],
});

const isLikelyHeading = (line, rawLine = "") => {
  if (!line || line.length > 50) return false;

  const wordCount = line.split(/\s+/).filter(Boolean).length;
  if (wordCount > 4) return false;

  const trimmedRaw = rawLine.trim();
  const isMostlyUppercase =
    trimmedRaw &&
    trimmedRaw === trimmedRaw.toUpperCase() &&
    /[A-Z]/.test(trimmedRaw);

  const hasBulletLikeStart = /^[•\-*]/.test(trimmedRaw);
  if (hasBulletLikeStart) return false;

  return isMostlyUppercase || wordCount <= 3;
};

const detectSection = (normalizedLine, rawLine) => {
  if (!isLikelyHeading(normalizedLine, rawLine)) return null;

  for (const [section, aliases] of Object.entries(sectionAliases)) {
    if (aliases.includes(normalizedLine)) return section;
  }

  for (const [section, aliases] of Object.entries(sectionAliases)) {
    if (
      aliases.some(
        (alias) =>
          normalizedLine.startsWith(alias) &&
          normalizedLine.length <= alias.length + 12
      )
    ) {
      return section;
    }
  }

  return null;
};

const parseSections = (text) => {
  // consistent empty return derived from createEmptySections so it never goes stale
  if (!text || typeof text !== "string") {
    return Object.fromEntries(
      Object.keys(createEmptySections()).map((k) => [k, ""])
    );
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = createEmptySections();
  const sectionOrder = []; // metadata: order sections appeared in

  // default to summary so pre-heading content (name, contact) isn't silently dropped
  let currentSection = null;;

  for (const rawLine of lines) {
    const normalizedLine = normalizeHeading(rawLine);
    const matchedSection = detectSection(normalizedLine, rawLine);

    if (matchedSection) {
      if (!sectionOrder.includes(matchedSection)) {
        sectionOrder.push(matchedSection);
      }
      currentSection = matchedSection;
      continue;
    }

    if (currentSection && sections[currentSection]) {
  sections[currentSection].push(rawLine);
}
  }

  const result = Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, value.join("\n")])
  );

  // attach section order as non-enumerable so it doesn't interfere with existing consumers
  result._sectionOrder = sectionOrder;

  return result;
};

module.exports = parseSections;