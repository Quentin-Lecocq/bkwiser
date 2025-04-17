import { createFileRoute } from '@tanstack/react-router';
import { betsQueryOptions } from '../../features/bets/bets.queries';
import BetsPage from '../../features/bets/components/bets.page';
import { queryClient } from '../../main';

export const Route = createFileRoute('/bets/')({
  loader: () => queryClient.ensureQueryData(betsQueryOptions),
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  return <BetsPage />;
}
