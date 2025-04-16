import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bankroll')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Bankroll</h2>
      <p>
        This is the bankroll page. It shows your current bankroll and allows you
        to manage it.
      </p>
    </div>
  );
}
