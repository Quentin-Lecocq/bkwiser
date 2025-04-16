import ReactDOM from 'react-dom/client';
import { Link, RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <div>
      <p>Sorry this page doesn't exist.</p>
      <Link to="/">Go home</Link>
    </div>
  ),
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
