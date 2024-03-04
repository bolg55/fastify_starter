import { createFileRoute } from '@tanstack/react-router';
import Pricing from '../../Pricing';

export const Route = createFileRoute('/_layout/pricing')({
  component: Pricing,
});
