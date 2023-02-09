
// Function to calculate DPR multiplier:
export const calculateDprMultiplier = (dpr: number, tvl: number, totalPrize: number) => {
  const formattedDpr = dpr / 100;
  const multiplier = (formattedDpr * tvl) / totalPrize;
  return multiplier;
}