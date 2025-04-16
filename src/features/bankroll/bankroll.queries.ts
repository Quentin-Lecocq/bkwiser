import { queryOptions } from '@tanstack/react-query';
import { fetchBankroll } from './bankroll.api';

export const bankrollQueryOptions = queryOptions({
  queryKey: ['bankroll'],
  queryFn: () => fetchBankroll(),
});
