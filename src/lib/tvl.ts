
// Imports:
import weaver from 'weaverfi';
import type { Address, ABI } from 'weaverfi/dist/types';

// Initializations:
const ethTicket: Address = '0xdd4d117723C257CEe402285D3aCF218E9A8236E1';
const polyTicket: Address = '0x6a304dFdb9f808741244b6bfEe65ca7B3b3A6076';
const avaxTicket: Address = '0xB27f379C050f6eD0973A01667458af6eCeBc1d90';
const opTicket: Address = '0x62BB4fc73094c83B5e952C2180B23fA7054954c4';
const decimals = 6;
const ticketABI: ABI = [{ constant: true, inputs: [{ name: "_target", type: "uint64" }], name: "getTotalSupplyAt", outputs: [{ name: "", type: "uint256" }], type: "function" }];

// Function to fetch PoolTogether V4 TVL:
export const fetchTVL = async () => {
  let timestamp = (Date.now() / 1000).toFixed(0);
  let ethTVL = parseInt(await weaver.ETH.query(ethTicket, ticketABI, 'getTotalSupplyAt', [timestamp]));
  let polyTVL = parseInt(await weaver.POLY.query(polyTicket, ticketABI, 'getTotalSupplyAt', [timestamp]));
  let avaxTVL = parseInt(await weaver.AVAX.query(avaxTicket, ticketABI, 'getTotalSupplyAt', [timestamp]));
  let opTVL = parseInt(await weaver.OP.query(opTicket, ticketABI, 'getTotalSupplyAt', [timestamp]));
  return (ethTVL + polyTVL + avaxTVL + opTVL) / (10 ** decimals);
}