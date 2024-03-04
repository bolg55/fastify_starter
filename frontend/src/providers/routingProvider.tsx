import { Route as rootRoute } from '../routes/__root';
import { createRouter, NotFoundRoute } from '@tanstack/react-router';
// Import the generated route tree
import { routeTree } from '../routeTree.gen';

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found',
});

// Create a new router instance
const router = createRouter({
  routeTree,
  notFoundRoute,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
