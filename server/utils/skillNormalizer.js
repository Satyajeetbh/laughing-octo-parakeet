const SKILL_CANONICAL_MAP = {
  javascript: "javascript",
  js: "javascript",

  typescript: "typescript",
  ts: "typescript",

  python: "python",

  java: "java",

  "c++": "c++",
  "c/c++": "c++",
  cpp: "c++",
  cplusplus: "c++",
  "c plus plus": "c++",

  react: "react",
  reactjs: "react",
  "react.js": "react",

  "next.js": "next.js",
  nextjs: "next.js",

  "node.js": "node.js",
  nodejs: "node.js",

  express: "express.js",
  "express.js": "express.js",

  tailwind: "tailwind css",
  "tailwind css": "tailwind css",

  html: "html",
  html5: "html",

  css: "css",
  css3: "css",

  mongodb: "mongodb",
  "mongo db": "mongodb",
  mongo: "mongodb",

  mysql: "mysql",

  postgresql: "postgresql",
  postgres: "postgresql",
  "postgre sql": "postgresql",

  docker: "docker",

  git: "git",
  github: "github",
  gitlab: "gitlab",

  linux: "linux",
  ubuntu: "linux",
  unix: "linux",

  postman: "postman",

  vscode: "vs code",
  "vs code": "vs code",
  "visual studio code": "vs code",

  "rest api": "rest api",
  "rest apis": "rest api",
  restful: "rest api",
  "restful api": "rest api",
  "restful apis": "rest api",

  auth: "authentication",
  authentication: "authentication",
  jwt: "jwt",
  oauth: "oauth",

  mvc: "mvc architecture",
  "mvc architecture": "mvc architecture",

  "responsive design": "responsive design",
  "responsive web": "responsive design",

  "chart.js": "chart.js",
  chartjs: "chart.js",

  "better auth": "better auth",

  inngest: "inngest",

  shadcn: "shadcn ui",
  "shadcn ui": "shadcn ui",
  "shadcn/ui": "shadcn ui",

  firebase: "firebase",

  kotlin: "kotlin",

  "jetpack compose": "jetpack compose",
  "jetpack components": "jetpack components",

  "machine learning": "machine learning",
  ml: "machine learning",

  "deep learning": "deep learning",
  dl: "deep learning",

  aws: "aws",
  "amazon web services": "aws",
  "amazon aws": "aws",

  graphql: "graphql",
  "graph ql": "graphql",

  redis: "redis",

  prisma: "prisma",
  "prisma orm": "prisma",

  "spring boot": "spring boot",
  spring: "spring",

  django: "django",

  figma: "figma",

  sql: "sql",

  redux: "redux",
  "redux toolkit": "redux",
  rtk: "redux",

  vue: "vue.js",
  "vue.js": "vue.js",
  vuejs: "vue.js",

  angular: "angular",
  angularjs: "angular",

  webpack: "webpack",

  vite: "vite",
  "vite.js": "vite",

  jest: "jest",

  "ci/cd": "ci/cd",
  "ci cd": "ci/cd",
  "github actions": "ci/cd",
  jenkins: "ci/cd",

  kubernetes: "kubernetes",
  k8s: "kubernetes",

  azure: "azure",
  "microsoft azure": "azure",

  gcp: "gcp",
  "google cloud": "gcp",
  "google cloud platform": "gcp",

  "socket.io": "socket.io",
  websocket: "websocket",
  "web socket": "websocket",

  stripe: "stripe",
};

const INVALID_SKILLS = new Set([
  "",
  "api",
  "apis",
  "code",
  "coding",
  "design",
  "development",
  "system",
  "architecture",
  "responsive",
  "tools",
  "frameworks",
  "libraries",
  "databases",
  "other",
  "and",
  "or",
  "with",
  "using",
  "via",
  "the",
  "a",
  "an",
  "in",
  "of",
  "for",
  "on",
  "to",
  "etc",
  "experience",
  "knowledge",
  "understanding",
  "proficient",
  "proficiency",
  "familiar",
  "familiarity",
  "basic",
  "advanced",
  "intermediate",
  "strong",
  "good",
  "solid",
  "excellent",
  "various",
  "multiple",
  "including",
  "such as",
  "skills",
  "technical",
  "software",
  "web",
  "application",
  "applications",
  "service",
  "services",
  "platform",
  "platforms",
  "backend",
  "frontend",
  "full stack",
  "fullstack",
]);

const stripVersion = (text) =>
  text.replace(/\s+v?\d+(\.\d+)*$/i, "").trim();

const stripSymbols = (text) =>
  text.replace(/^[^a-z0-9]+/i, "").replace(/[^a-z0-9+#./\s-]+$/i, "").trim();

const normalizeSkill = (skill) => {
  if (!skill || typeof skill !== "string") return null;

  let cleaned = skill
    .toLowerCase()
    .trim()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ");

  cleaned = stripSymbols(cleaned);
  cleaned = stripVersion(cleaned);

  if (!cleaned || INVALID_SKILLS.has(cleaned)) return null;

  if (Object.prototype.hasOwnProperty.call(SKILL_CANONICAL_MAP, cleaned)) {
    return SKILL_CANONICAL_MAP[cleaned];
  }

  return cleaned;
};

const normalizeSkills = (skills) => {
  if (!Array.isArray(skills)) return [];

  const normalized = new Set();

  for (const skill of skills) {
    const mapped = normalizeSkill(skill);
    if (mapped) normalized.add(mapped);
  }

  return Array.from(normalized);
};

module.exports = normalizeSkills;
module.exports.normalizeSkill = normalizeSkill;