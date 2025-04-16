import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/bets/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2>New bet</h2>
      <p>Form to create a new bet</p>
      <Link to="/bets">Back to bets</Link>
    </>
  );
}
