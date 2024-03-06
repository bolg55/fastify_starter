import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Layout from '../Layout';
import { AuthContextType } from '../context/AuthContext';

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className='flex gap-2 p-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{' '}
        <Link to='/pricing' className='[&.active]:font-bold'>
          Pricing
        </Link>
        {''}
        <Link to='/auth' className='[&.active]:font-bold'>
          Auth
        </Link>
      </div>
      <hr />
      <Layout>
        <Outlet />
        <TanStackRouterDevtools />
      </Layout>
    </>
  ),
});
