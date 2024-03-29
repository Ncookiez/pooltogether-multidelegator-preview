
// Function fetch estimated prize APR:
export const fetchAPR = (prizeTiers: {prize: number, num: number}[], dprMultiplier: number, maxPrizes: number, tvl: number, depositAmount: number) => {

  // Initializations:
  let dailyPrizeCount = 0;
  let winnings = 0;
  let cumulativeMaxPrizes = 0;

  // Finding Total Prize Data:
  prizeTiers.forEach(tier => {
    dailyPrizeCount += tier.num;
  });

  // Finding Daily Winning Probability:
  let dailyWinProbability = (1 / (tvl / dailyPrizeCount)) * depositAmount * dprMultiplier;

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