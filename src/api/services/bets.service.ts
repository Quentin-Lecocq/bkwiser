import { Bet, BetLeg, Outcome } from '../schemas/bets.schema';

export function computeBetOutcome(legs: BetLeg[]): Outcome {
  const outcomes = legs.map(({ outcome }) => outcome);

  if (outcomes.every((o) => o === 'won')) return 'won';
  if (outcomes.some((o) => o === 'lost')) return 'lost';
  if (outcomes.every((o) => o === 'void')) return 'void';

  return 'pending';
}

export function computeGainAndProfit(
  odds: number,
  stake: number,
  outcome: Outcome,
): {
  gain: number;
  profit: number;
} {
  let gain = 0;
  let profit = 0;
  switch (outcome) {
    case 'won':
      gain = odds * stake;
      profit = gain - stake;
      break;
    case 'lost':
      gain = 0;
      profit = -stake;
      break;
    case 'void':
      gain = 0;
      profit = 0;
      break;
    case 'pending':
      gain = 0;
      profit = 0;
      break;
    default:
      throw new Error(`Unknown outcome: ${outcome}`);
  }

  return {
    gain: Number(gain.toFixed(2)),
    profit: Number(profit.toFixed(2)),
  };
}

export function applyBetImpactOnBankroll(bet: Bet): number {
  if (bet.outcome === 'pending') return 0;
  return bet.profit;
}

export function updateBankrollOnBetEdit(
  currentBankroll: number,
  oldBet: Bet,
  newBet: Bet,
): number {
  const oldImpact = applyBetImpactOnBankroll(oldBet);
  const newImpact = applyBetImpactOnBankroll(newBet);

  return currentBankroll - oldImpact + newImpact;
}
