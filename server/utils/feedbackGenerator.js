const generateFeedback = ({
  scoreBreakdown,
  quantification,
  wordCount
}) => {
  const strengths = [];
  const improvements = [];

  const {
    bulletScore,
    quantScore,
    skillsScore,
    actionScore,
    lengthScore
  } = scoreBreakdown;

  // Bullet Quality
  if (bulletScore >= 15) {
    strengths.push("Strong use of bullet points for structure and readability.");
  } else {
    improvements.push("Add more structured bullet points under projects or experience.");
  }

  // Quantification
  if (quantScore >= 20) {
    strengths.push("Good use of measurable impact in multiple bullets.");
  } else {
    improvements.push(
      `Only ${quantification.quantified_bullets} out of ${quantification.total_bullets} bullets contain measurable results. Add metrics like %, user growth, performance improvements.`
    );
  }

  // Skills Density
  if (skillsScore >= 15) {
    strengths.push("Skills section shows good technical coverage.");
  } else {
    improvements.push("Expand technical skills relevant to your target role.");
  }

  // Action Verbs
  if (actionScore >= 10) {
    strengths.push("Uses strong action verbs in project descriptions.");
  } else {
    improvements.push("Start more bullet points with strong action verbs like Built, Optimized, Reduced, Led.");
  }

  // Length
  if (lengthScore >= 15) {
    strengths.push("Resume length is optimal.");
  } else if (wordCount < 300) {
    improvements.push("Resume is too short. Add more measurable achievements and technical depth.");
  } else {
    improvements.push("Resume may be slightly lengthy. Keep it concise and impact-focused.");
  }

  return {
    strengths,
    improvements
  };
};

module.exports = generateFeedback;