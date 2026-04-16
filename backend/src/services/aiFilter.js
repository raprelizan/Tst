const prohibitedWords = ['kill', 'bomb', 'terror', 'fake report', 'revenge'];

export function evaluateReportQuality({ title, description }) {
  const normalized = `${title} ${description}`.toLowerCase();

  const matched = prohibitedWords.filter((word) => normalized.includes(word));

  if (matched.length > 0) {
    return {
      score: 0,
      status: 'flagged',
      reason: `Contains potentially harmful keywords: ${matched.join(', ')}`
    };
  }

  if (description.length < 40) {
    return {
      score: 30,
      status: 'low_quality',
      reason: 'Description is too short to evaluate reliably.'
    };
  }

  return {
    score: 90,
    status: 'approved_for_review',
    reason: 'Passed basic rule-based screening.'
  };
}
