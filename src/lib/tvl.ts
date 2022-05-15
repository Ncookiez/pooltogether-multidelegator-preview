
// Imports:
import weaver from 'weaverfi';
import { minABI } from 'weaverfi/dist/ABIs.js';
import type { Address } from 'weaverfi/dist/types';

// Initializations:
const ethTicket: Address = '0xdd4d117723C257CEe402285D3aCF218E9A8236E1';
const polyTicket: Address = '0x6a304dFdb9f808741244b6bfEe65ca7B3b3A6076';
const avaxTicket: Address = '0xB27f379C050f6eD0973A01667458af6eCeBc1d90';
const decimals = 6;

// Function to fetch PoolTogether V4 TVL:
export const fetchTVL = async () => {
  let ethTVL = parseInt(await weaver.ETH.query(ethTicket, minABI, 'totalSupply', []));
  let polyTVL = parseInt(await weaver.POLY.query(polyTicket, minABI, 'totalSupply', []));
  let avaxTVL = parseInt(await weaver.AVAX.query(avaxTicket, minABI, 'totalSupply', []));
  return (ethTVL + polyTVL + avaxTVL) / (10 ** decimals);
}