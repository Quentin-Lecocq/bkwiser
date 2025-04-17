import { createFileRoute } from '@tanstack/react-router';
import BetsPage from '../../features/bets/components/bets.page';

export const Route = createFileRoute('/bets/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BetsPage />;
}
