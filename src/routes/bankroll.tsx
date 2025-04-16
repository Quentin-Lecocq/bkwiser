import { createFileRoute } from '@tanstack/react-router';
import BankrollPage from '../features/bankroll/components/bankroll.page';

export const Route = createFileRoute('/bankroll')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BankrollPage />;
}
