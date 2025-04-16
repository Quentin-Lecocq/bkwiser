import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/bets/$betId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Bet details</h2>
      <p>Details of bet</p>
      <Link to="/bets">Back to bets</Link>
      <Link to="/bets/new">Create new bet</Link>
    </div>
  );
}
