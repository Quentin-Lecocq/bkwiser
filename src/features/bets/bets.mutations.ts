import { useMutation } from '@tanstack/react-query';
import { createBet } from './bets.api';

export function useCreateSingleBetMutation() {
  return useMutation({
    mutationFn: async ({ bet }: { bet: any }) => {
      await createBet(bet);
      // await addDeposit(amount);
    },
  });
}

export function useCreateComboBetMutation() {
  return useMutation({
    mutationFn: async ({ bet }: { bet: any }) => {
      console.log({ bet });
      // await addDeposit(amount);
    },
  });
}
