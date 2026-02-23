function detectQuantification(experienceText) {
  if (!experienceText || typeof experienceText !== "string") {
    return {
      total_bullets: 0,
      quantified_bullets: 0,
      percentage_mentions: 0,
      number_mentions: 0
    };
  }

  // Split experience into bullets using common bullet symbols and numbered bullets
  const bullets = experienceText
    .split(/\n|•|\u2022|-|\*|–|→||\d+\./)
    .map(b => b.trim())
    .filter(b => b.length > 5); // keep shorter bullets

  // Match percentages with optional spaces before %, and numbers with optional suffixes
  const percentageRegex = /\b\d+(\.\d+)?\s*%|\b\d+(\.\d+)?\spercent\b/gi;
  const numberRegex = /\b\d+(\.\d+)?(k|K|m|M|x|\+)?\b/g;

  let quantifiedBullets = 0;
  let percentageMentions = 0;
  let numberMentions = 0;

  bullets.forEach(bullet => {
    const percentageMatches = bullet.match(percentageRegex);
    const numberMatches = bullet.match(numberRegex);

    if (percentageMatches) {
      percentageMentions += percentageMatches.length;
    }

    if (numberMatches) {
      numberMentions += numberMatches.length;
    }

    if (percentageMatches || numberMatches) {
      quantifiedBullets++;
    }
  });

  return {
    total_bullets: bullets.length,
    quantified_bullets: quantifiedBullets,
    percentage_mentions: percentageMentions,
    number_mentions: numberMentions
  };
}

module.exports = detectQuantification;