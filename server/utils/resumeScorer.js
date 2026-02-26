function calculateResumeScore({
  total_bullets,
  quantified_bullets,
  skills,
  wordCount,
  textToAnalyze
}) {
  // 1️⃣ Bullet Structure (20)
  let bulletScore = 0;
  if (total_bullets >= 6) bulletScore = 20;
  else if (total_bullets >= 3) bulletScore = 12;
  else bulletScore = 5;

  // 2️⃣ Quantification Strength (30)
  const ratio =
    total_bullets > 0
      ? quantified_bullets / total_bullets
      : 0;

  let quantScore = 0;
  if (ratio >= 0.6) quantScore = 30;
  else if (ratio >= 0.3) quantScore = 20;
  else if (ratio > 0) quantScore = 10;
  else quantScore = 0;

  // 3️⃣ Skills Density (20)
  let skillsScore = 0;
  if (skills.length >= 8) skillsScore = 20;
  else if (skills.length >= 5) skillsScore = 15;
  else skillsScore = 8;

  // 4️⃣ Action Verb Strength (15)
  const strongVerbs = [
    "built",
    "developed",
    "implemented",
    "optimized",
    "improved",
    "reduced",
    "designed",
    "led",
    "created",
    "engineered"
  ];

  const bullets = textToAnalyze
    .split("\n")
    .filter(line => /^(\u2022|•|\*|-|\d+\.)/.test(line));

  let strongVerbCount = 0;

  bullets.forEach(bullet => {
    const firstWord = bullet
      .replace(/^(\u2022|•|\*|-|\d+\.)/, "")
      .trim()
      .split(" ")[0]
      ?.toLowerCase();

    if (strongVerbs.includes(firstWord)) {
      strongVerbCount++;
    }
  });

  const verbRatio =
    bullets.length > 0
      ? strongVerbCount / bullets.length
      : 0;

  let actionScore = 0;
  if (verbRatio >= 0.7) actionScore = 15;
  else if (verbRatio >= 0.4) actionScore = 10;
  else actionScore = 5;

  // 5️⃣ Length Optimization (15)
  let lengthScore = 0;
  if (wordCount >= 350 && wordCount <= 600)
    lengthScore = 15;
  else if (wordCount >= 250)
    lengthScore = 10;
  else lengthScore = 5;

  const totalScore =
    bulletScore +
    quantScore +
    skillsScore +
    actionScore +
    lengthScore;

  return {
    totalScore,
    breakdown: {
      bulletScore,
      quantScore,
      skillsScore,
      actionScore,
      lengthScore
    }
  };
}

module.exports = calculateResumeScore;