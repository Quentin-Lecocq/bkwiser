import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../main';
import { createBetDB, deleteBetDB } from './bets.api';
import { Bet, BetFormValues, Outcome } from './bets.types';

function computeGainAndProfit(
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

export function useCreateBetMutation() {
  return useMutation({
    mutationFn: async ({ bet }: { bet: BetFormValues }) => {
      const outcome = bet.outcome;
      const odds = Number(
        bet.legs.reduce((acc, leg) => acc * leg.odds, 1).toFixed(2),
      );

      const profit =
        outcome === 'pending'
          ? 0
          : computeGainAndProfit(odds, bet.stake, outcome).profit;

      const payload: Omit<Bet, 'id' | 'createdAt' | 'updatedAt'> = {
        ...bet,
        date: new Date(bet.date),
        odds,
        profit,
      };

      await createBetDB(payload);
      await queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
  });
}

export function useDeleteBetMutation() {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await deleteBetDB(id);
      await queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
  });
}
