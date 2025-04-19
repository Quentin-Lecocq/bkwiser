import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../main';
import { createBetDB, deleteBetDB, updateBetDB } from './bets.api';
import { computeGainAndProfit } from './bets.services';
import { Bet, BetFormValues } from './bets.types';

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

      const payload: Omit<Bet, 'id' | 'createdAt' | 'updatedAt' | 'gain'> = {
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

export function useUpdateBetMutation() {
  return useMutation({
    mutationFn: async ({
      id,
      originalBet,
      updatedValues,
    }: {
      id: string;
      originalBet: Bet;
      updatedValues: BetFormValues;
    }) => {
      const payload: Omit<
        Bet,
        'id' | 'createdAt' | 'updatedAt' | 'gain' | 'netResult'
      > = {
        ...updatedValues,
        date: new Date(updatedValues.date),
        odds: originalBet.odds,
        profit: originalBet.profit,
      };

      await updateBetDB(id, payload);
      // await queryClient.invalidateQueries({
      //   queryKey: ['bet'],
      // });
    },
  });
}
