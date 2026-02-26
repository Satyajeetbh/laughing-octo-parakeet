const skillMap = {
  "vs code": "vs code",
  "vs": "vs code",
  "code": null,

  "rest apis": "rest api",
  "rest": "rest api",
  "apis": null,
  "api": null,

  "node.j": "node.js",

  "shadcn/ui": "shadcn ui",
  "cssshadcnui": "tailwind css",

  "responsive design": "responsive design"
};

function normalizeSkills(skills) {
  const normalized = new Set();

  skills.forEach(skill => {
    const lower = skill.toLowerCase().trim();

    if (skillMap.hasOwnProperty(lower)) {
      const mapped = skillMap[lower];
      if (mapped) normalized.add(mapped);
    } else {
      normalized.add(lower);
    }
  });

  return Array.from(normalized);
}

module.exports = normalizeSkills;