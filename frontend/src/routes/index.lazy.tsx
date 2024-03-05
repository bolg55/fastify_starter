import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '../Home';
import Loader from '../components/Loader';

export const Route = createLazyFileRoute('/')({
  pendingComponent: Loader,
  component: Home,
});
