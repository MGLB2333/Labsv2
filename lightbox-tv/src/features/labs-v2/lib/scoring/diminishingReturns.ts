// Diminishing returns curve: score decreases as budget increases
export const applyDiminishingReturns = (baseScore: number, budget: number, maxBudget: number): number => {
  if (maxBudget <= 0) return baseScore;
  
  // Exponential decay: score decreases as we approach max budget
  const ratio = Math.min(budget / maxBudget, 1);
  const decayFactor = Math.exp(-2 * ratio); // Decay factor
  
  return baseScore * (0.5 + 0.5 * decayFactor); // Score between 50-100% of base
};


