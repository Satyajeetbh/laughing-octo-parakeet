const detectQuantification = (text) => {
  if (!text) {
    return {
      total_bullets: 0,
      quantified_bullets: 0,
      percentage_mentions: 0,
      number_mentions: 0
    };
  }

  const bullets = text
    .split("\n")
    .map(line => line.trim())
    .filter(line =>
      /^(\u2022|•|\*|-|\d+\.)/.test(line)
    );

  let quantifiedBullets = 0;
  let percentageMentions = 0;
  let numberMentions = 0;

  bullets.forEach(bullet => {
    const cleanBullet = bullet.toLowerCase();

    // Ignore years like 2019, 2024
    const hasYearOnly = /\b(19|20)\d{2}\b/.test(cleanBullet);

    // Ignore date formats like 06/2024
    const hasDateFormat = /\b\d{1,2}\/\d{4}\b/.test(cleanBullet);

    // Count % mentions
    const percentMatches = cleanBullet.match(/\b\d+%/g);
    if (percentMatches) {
      percentageMentions += percentMatches.length;
    }

    // Count meaningful numbers
    const meaningfulNumberMatches = cleanBullet.match(
      /\b\d+(\+|k|m|ms|s|x)?\b/g
    );

    let validNumber = false;

    if (meaningfulNumberMatches) {
      meaningfulNumberMatches.forEach(num => {
        if (
          !hasYearOnly &&
          !hasDateFormat &&
          !/^\d{4}$/.test(num) // ignore pure 4-digit numbers
        ) {
          numberMentions++;
          validNumber = true;
        }
      });
    }

    if ((percentMatches && percentMatches.length > 0) || validNumber) {
      quantifiedBullets++;
    }
  });

  return {
    total_bullets: bullets.length,
    quantified_bullets: quantifiedBullets,
    percentage_mentions: percentageMentions,
    number_mentions: numberMentions
  };
};

module.exports = detectQuantification;