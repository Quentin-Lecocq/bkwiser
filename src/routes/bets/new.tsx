import { createFileRoute } from '@tanstack/react-router';
import CreateBetPage from '../../features/bets/components/create-bet.page';

export const Route = createFileRoute('/bets/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateBetPage />;
}
