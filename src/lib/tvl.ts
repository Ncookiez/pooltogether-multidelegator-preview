
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
  const timestamp = (Date.now() / 1000).toFixed(0);
  const eth = parseInt(await weaver.eth.query(ethTicket, ticketABI, 'getTotalSupplyAt', [timestamp])) / (10 ** decimals);
  const poly = parseInt(await weaver.poly.query(polyTicket, ticketABI, 'getTotalSupplyAt', [timestamp])) / (10 ** decimals);
  const avax = parseInt(await weaver.avax.query(avaxTicket, ticketABI, 'getTotalSupplyAt', [timestamp])) / (10 ** decimals);
  const op = parseInt(await weaver.op.query(opTicket, ticketABI, 'getTotalSupplyAt', [timestamp])) / (10 ** decimals);
  const total = eth + poly + avax + op;
  return { eth, poly, avax, op, total }
}