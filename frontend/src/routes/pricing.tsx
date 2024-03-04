import { createFileRoute } from '@tanstack/react-router';
import Pricing from '../Pricing';

export const Route = createFileRoute('/pricing')({
  component: Pricing,
});
