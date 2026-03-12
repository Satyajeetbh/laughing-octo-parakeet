const SKILL_PATTERNS = [
  { canonical: "java", patterns: ["java"] },
  { canonical: "javascript", patterns: ["javascript", "js"] },
  { canonical: "typescript", patterns: ["typescript", "ts"] },
  { canonical: "python", patterns: ["python"] },
  { canonical: "c++", patterns: ["c++", "c/c++", "cpp", "cplusplus", "c plus plus"] },
  { canonical: "react", patterns: ["react", "reactjs", "react.js"] },
  { canonical: "next.js", patterns: ["next.js", "nextjs"] },
  { canonical: "node.js", patterns: ["node.js", "nodejs"] },
  { canonical: "express.js", patterns: ["express", "express.js"] },
  { canonical: "tailwind css", patterns: ["tailwind", "tailwind css"] },
  { canonical: "html", patterns: ["html", "html5"] },
  { canonical: "css", patterns: ["css", "css3"] },
  { canonical: "mongodb", patterns: ["mongodb", "mongo db", "mongo"] },
  { canonical: "mysql", patterns: ["mysql"] },
  { canonical: "postgresql", patterns: ["postgresql", "postgres", "postgre sql"] },
  { canonical: "docker", patterns: ["docker"] },
  { canonical: "git", patterns: ["git", "github", "gitlab"] },
  { canonical: "linux", patterns: ["linux", "ubuntu", "unix"] },
  { canonical: "postman", patterns: ["postman"] },
  { canonical: "vs code", patterns: ["vs code", "vscode", "visual studio code"] },
  { canonical: "rest api", patterns: ["rest api", "rest apis", "restful", "restful api"] },
  { canonical: "authentication", patterns: ["authentication", "auth", "jwt", "oauth"] },
  { canonical: "mvc architecture", patterns: ["mvc", "mvc architecture"] },
  { canonical: "responsive design", patterns: ["responsive design", "responsive web"] },
  { canonical: "chart.js", patterns: ["chart.js", "chartjs"] },
  { canonical: "better auth", patterns: ["better auth"] },
  { canonical: "inngest", patterns: ["inngest"] },
  { canonical: "shadcn ui", patterns: ["shadcn/ui", "shadcn ui", "shadcn"] },
  { canonical: "firebase", patterns: ["firebase"] },
  { canonical: "kotlin", patterns: ["kotlin"] },
  { canonical: "jetpack compose", patterns: ["jetpack compose", "jetpack components"] },
  { canonical: "machine learning", patterns: ["machine learning", "ml"] },
  { canonical: "deep learning", patterns: ["deep learning", "dl"] },
  { canonical: "aws", patterns: ["aws", "amazon web services", "amazon aws"] },
  { canonical: "graphql", patterns: ["graphql", "graph ql"] },
  { canonical: "redis", patterns: ["redis"] },
  { canonical: "prisma", patterns: ["prisma", "prisma orm"] },
  { canonical: "spring boot", patterns: ["spring boot", "spring"] },
  { canonical: "django", patterns: ["django"] },
  { canonical: "figma", patterns: ["figma"] },
  { canonical: "sql", patterns: ["sql"] },
  { canonical: "redux", patterns: ["redux", "redux toolkit", "rtk"] },
  { canonical: "vue.js", patterns: ["vue", "vue.js", "vuejs"] },
  { canonical: "angular", patterns: ["angular", "angularjs"] },
  { canonical: "webpack", patterns: ["webpack"] },
  { canonical: "vite", patterns: ["vite", "vite.js"] },
  { canonical: "jest", patterns: ["jest"] },
  { canonical: "ci/cd", patterns: ["ci/cd", "ci cd", "github actions", "jenkins"] },
  { canonical: "kubernetes", patterns: ["kubernetes", "k8s"] },
  { canonical: "azure", patterns: ["azure", "microsoft azure"] },
  { canonical: "gcp", patterns: ["gcp", "google cloud", "google cloud platform"] },
  { canonical: "socket.io", patterns: ["socket.io", "websocket", "web socket"] },
  { canonical: "stripe", patterns: ["stripe"] },
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[•●▪◦]/g, " ")
    .replace(/[()]/g, " ")
    .replace(/[/:|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const extractSkills = (text) => {
  if (!text || typeof text !== "string") return [];

  const normalizedText = normalizeText(text);
  const foundSkills = new Set();

  for (const skill of SKILL_PATTERNS) {
    for (const pattern of skill.patterns) {
      const escapedPattern = escapeRegex(pattern.toLowerCase());
      const regex = new RegExp(`(^|\\W)${escapedPattern}(\\W|$)`, "i");
      if (regex.test(normalizedText)) {
        foundSkills.add(skill.canonical);
        break;
      }
    }
  }

  return Array.from(foundSkills);
};

module.exports = extractSkills;