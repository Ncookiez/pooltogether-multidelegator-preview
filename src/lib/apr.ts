
// Approximated TVL Indexes:
const approximatedTVLs = [10000000, 15000000, 20000000, 25000000, 30000000, 35000000, 40000000, 45000000, 50000000, 55000000, 60000000, 65000000, 70000000, 75000000, 80000000, 85000000, 90000000, 95000000, 100000000];

/* ========================================================================================================================================================================= */

// Function to fetch prize APR (equations from https://mycurvefit.com/ with simulated data from https://github.com/Ncookiez/prize-simulation):
export const fetchAPR = (tvl: number, avgDelegation: number) => {
  let apr = 0;
  if(tvl > 0 && avgDelegation > 0) {
    let closestTVL = findClosestTVL(approximatedTVLs, tvl);
    switch(closestTVL) {
      case 10000000:
        return (19.028617 / (1 + ((avgDelegation / 40588.23) ** 1.545304))) + 7.025623;
      case 15000000:
        return (12.905955 / (1 + ((avgDelegation / 56165.4) ** 1.370764))) + 4.710305;
      case 20000000:
        return (8.649585 / (1 + ((avgDelegation / 76345.4) ** 1.851246))) + 3.982355;
      case 25000000:
        return (7.240726 / (1 + ((avgDelegation / 88833.59) ** 1.701776))) + 3.194824;
      case 30000000:
        return (6.298146 / (1 + ((avgDelegation / 106865.5) ** 1.511951))) + 2.56263;
      case 35000000:
        return (4.749731 / (1 + ((avgDelegation / 131330.6) ** 1.925739))) + 2.425516;
      case 40000000:
        return (4.789309 / (1 + ((avgDelegation / 8389.677) ** 0.4535373))) + 3.140311;
      case 45000000:
        return (3.883226 / (1 + ((avgDelegation / 161983.3) ** 1.709347))) + 1.866813;
      case 50000000:
        return (3.650014 / (1 + ((avgDelegation / 180217.6) ** 1.600687))) + 1.606305;
      case 55000000:
        return (3.067485 / (1 + ((avgDelegation / 195416.7) ** 1.811699))) + 1.582425;
      case 60000000:
        return (2.663483 / (1 + ((avgDelegation / 8495.179) ** 0.3979488))) + 2.389425; // Maybe innacurate.
      case 65000000:
        return (1.973803 / (1 + ((avgDelegation / 12458.4) ** 0.7032411))) + 2.447715; // Maybe innacurate.
      case 70000000:
        return (1.567741 / (1 + ((avgDelegation / 9030.149) ** 0.6168849))) + 2.403177; // Maybe innacurate.
      case 75000000:
        return (2.076021 / (1 + ((avgDelegation / 263126.9) ** 2.199026))) + 1.276304;
      case 80000000:
        return (2.117543 / (1 + ((avgDelegation / 275238.5) ** 1.839876))) + 1.120059;
      case 85000000:
        return (0.900746 / (1 + ((avgDelegation / 15784.47) ** 1.134911))) + 2.106863; // Maybe innacurate.
      case 90000000:
        return (1.474163 / (1 + ((avgDelegation / 7492.235) ** 0.5376317))) + 1.906244; // Maybe innacurate.
      case 95000000:
        return (0.931589 / (1 + ((avgDelegation / 8640.435) ** 0.6164148))) + 1.939496; // Maybe innacurate.
      case 100000000:
        return (0.894884 / (1 + ((avgDelegation / 9152.285) ** 0.6041142))) + 1.858098; // Maybe innacurate.
    }
  }
  return apr;
}

/* ========================================================================================================================================================================= */

// Function to find closest approximated TVL:
const findClosestTVL = (tvls: number[], tvl: number) => {
  let closestVal = tvls[0];
  let smallestDiff = Number.MAX_SAFE_INTEGER;
  for(let val of tvls) {
    let diff = Math.abs(tvl - val);
    if(diff < smallestDiff) {
      smallestDiff = diff;
      closestVal = val;
    }
  }
  return closestVal;
}