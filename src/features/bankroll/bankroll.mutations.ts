import { useMutation } from '@tanstack/react-query';
import { addDeposit, addWithdraw, resetBankroll } from './bankroll.api';
import { queryClient } from '../../main';

export function useDepositMutation() {
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      await addDeposit(amount);
      await queryClient.invalidateQueries({ queryKey: ['bankroll'] });
    },
  });
}

export function useWithdrawMutation() {
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      await addWithdraw(amount);
      await queryClient.invalidateQueries({ queryKey: ['bankroll'] });
    },
  });
}

export function useBankrollResetMutation() {
  return useMutation({
    mutationFn: async () => {
      await resetBankroll();
      await queryClient.invalidateQueries({ queryKey: ['bankroll'] });
    },
  });
}
