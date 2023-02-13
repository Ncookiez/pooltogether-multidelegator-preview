
// Function to calculate DPR multiplier:
export const calculateDprMultiplier = (dpr: number, tvl: number, totalPrize: number) => {
  const multiplier = (dpr * tvl) / totalPrize;
  return multiplier;
}