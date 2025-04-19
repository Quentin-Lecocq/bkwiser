import { outcomeOptions, typeOptions } from './bets.constants';

export type BetType = (typeof typeOptions)[number];
export type Outcome = (typeof outcomeOptions)[number];

type BetLeg = {
  id: string;
  label: string;
  odds: number;
  outcome: Outcome;
};

export interface Bet {
  id: string;
  stake: number;
  type: BetType;
  date: Date;
  odds: number;
  outcome: Outcome;
  bookmaker?: string;
  legs: BetLeg[];
  profit: number;
  gain: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BetFormValues {
  stake: number;
  type: BetType;
  date: string;
  outcome: Outcome;
  bookmaker?: string;
  legs: BetLeg[];
}
