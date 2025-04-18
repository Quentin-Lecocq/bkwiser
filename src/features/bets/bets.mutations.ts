import { useMutation } from '@tanstack/react-query';
import { createBet } from './bets.api';
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

      await createBet(payload);
    },
  });
}
