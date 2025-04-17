export type BetType = 'single' | 'combo';

type Outcome = 'win' | 'lose' | 'pending' | 'void';

type BetLeg = {
  id: string;
  description: string;
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
  netResult: number;
  bookmaker?: string;
  legs: BetLeg[];
  createdAt: Date;
  updatedAt: Date;
}
