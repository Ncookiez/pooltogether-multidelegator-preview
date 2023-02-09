
// Function fetch estimated prize APR:
export const fetchAPR = (prizeTiers: {prize: number, num: number}[], prizeChances: number[], maxPrizes: number, tvl: number, depositAmount: number) => {

  // Initializations:
  let dailyPrizeCount = 0;
  let winnings = 0;
  let cumulativeMaxPrizes = 0;

  // Finding Total Prize Data:
  prizeChances.forEach(chance => {
    dailyPrizeCount += chance;
  });

  // Finding Daily Winning Probability:
  let dailyWinProbability = (1 / (tvl / dailyPrizeCount)) * depositAmount;

  // Calculating Daily Winnings:
  prizeTiers.forEach(tier => {
    let expectedWins = Math.min(((tier.num / dailyPrizeCount) * dailyWinProbability), maxPrizes - cumulativeMaxPrizes);
    winnings += expectedWins * tier.prize;
    if(cumulativeMaxPrizes < maxPrizes) {
      cumulativeMaxPrizes = Math.min(cumulativeMaxPrizes + expectedWins, maxPrizes);
    }
  });

  // Calculating APR:
  let apr = (winnings * 365 / depositAmount) * 100;
  return apr;
}