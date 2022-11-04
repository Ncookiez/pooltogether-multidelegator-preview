
// Imports:
import weaver from 'weaverfi';
import type { Chain } from 'weaverfi/dist/types';

// Initializations:
const gasEstimate = 230000;
const estimatedL1RollupGas = 5000;

// Function to fetch estimated gas costs for delegations:
export const fetchDelegationCost = async (chain: Chain) => {
  let gas = await weaver[chain].getGasEstimates();
  let cost = (gasEstimate / (10 ** 9)) * gas.gasPrice * gas.tokenPrice;
  if(chain === 'op' || chain === 'arb') {
    if(gas.ethGasPrice && gas.ethTokenPrice) {
      cost += ((estimatedL1RollupGas / (10 ** 9)) * gas.ethGasPrice * gas.ethTokenPrice);
    }
  }
  return cost;
}