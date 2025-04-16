import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/bets/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>My bets</h2>
      <p>List of bets</p>
      <Link to="/bets/new">Create new bet</Link>
    </div>
  );
}
