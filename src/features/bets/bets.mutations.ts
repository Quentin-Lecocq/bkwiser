import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../main';
import { createBetDB, deleteBetDB } from './bets.api';
import { Bet, BetFormValues } from './bets.types';

export function useCreateBetMutation() {
  return useMutation({
    mutationFn: async ({ bet }: { bet: BetFormValues }) => {
      const payload: Omit<Bet, 'id' | 'netResult' | 'createdAt' | 'updatedAt'> =
        {
          ...bet,
          date: new Date(bet.date),
          odds: Number(
            bet.legs.reduce((acc, leg) => acc * leg.odds, 1).toFixed(2),
          ),
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
