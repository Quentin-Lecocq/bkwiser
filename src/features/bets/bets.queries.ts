import { queryOptions } from '@tanstack/react-query';
import { getBets } from './bets.api';

export const bankrollQueryOptions = queryOptions({
  queryKey: ['bets'],
  queryFn: () => getBets(),
});
