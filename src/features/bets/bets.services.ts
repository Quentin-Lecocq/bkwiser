import { Bet, BetFormValues, Outcome } from './bets.types';

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

export function transformBetToFormValues(bet: Bet): BetFormValues {
  return {
    stake: bet.stake,
    type: bet.type,
    date: new Date(bet.date).toISOString().split('T')[0],
    outcome: bet.outcome,
    bookmaker: bet.bookmaker ?? '',
    legs: bet.legs.map((leg) => ({
      id: leg.id,
      label: leg.label,
      odds: leg.odds,
      outcome: leg.outcome,
    })),
  };
}
