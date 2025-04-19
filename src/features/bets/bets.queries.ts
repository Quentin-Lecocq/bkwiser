import { queryOptions } from '@tanstack/react-query';
import { getBetsDB } from './bets.api';

export const betsQueryOptions = queryOptions({
  queryKey: ['bets'],
  queryFn: () => getBetsDB(),
});
