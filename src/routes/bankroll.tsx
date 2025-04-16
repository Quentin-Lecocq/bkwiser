import { createFileRoute } from '@tanstack/react-router';
import BankrollPage from '../features/bankroll/components/bankroll.page';
import { queryClient } from '../main';
import { bankrollQueryOptions } from '../features/bankroll/bankroll.queries';

export const Route = createFileRoute('/bankroll')({
  loader: () => queryClient.ensureQueryData(bankrollQueryOptions),
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  return <BankrollPage />;
}
