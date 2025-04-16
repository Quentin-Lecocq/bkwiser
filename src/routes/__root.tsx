import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/bankroll/history">Bankroll</Link>
        <Link to="/bets">Bets</Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
