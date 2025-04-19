import { queryOptions } from '@tanstack/react-query';
import { getBetByIdDB, getBetsDB } from './bets.api';

export const betsQueryOptions = queryOptions({
  queryKey: ['bets'],
  queryFn: () => getBetsDB(),
});

export const getBetByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['bet', id],
    queryFn: () => getBetByIdDB(id),
  });
