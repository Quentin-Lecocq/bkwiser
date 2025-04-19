import { createFileRoute, useParams } from '@tanstack/react-router';
import { getBetByIdQueryOptions } from '../../features/bets/bets.queries';
import BetPage from '../../features/bets/components/ bet.page';
import { queryClient } from '../../main';

export const Route = createFileRoute('/bets/$betId')({
  loader: ({ params }) =>
    queryClient.ensureQueryData(getBetByIdQueryOptions(params.betId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { betId } = useParams({ from: '/bets/$betId' });
  return <BetPage id={betId} />;
}
