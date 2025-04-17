import { queryOptions } from '@tanstack/react-query';
import { getBets } from './bets.api';

export const betsQueryOptions = queryOptions({
  queryKey: ['bets'],
  queryFn: () => getBets(),
});
