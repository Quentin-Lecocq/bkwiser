import { useMutation } from '@tanstack/react-query';
import { addDeposit } from './bankroll.api';
import { queryClient } from '../../main';

export function useAddDeposit() {
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      await addDeposit(amount);
      await queryClient.invalidateQueries({ queryKey: ['bankroll'] });
    },
  });
}
