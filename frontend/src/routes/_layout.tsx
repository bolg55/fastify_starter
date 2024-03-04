import { createFileRoute } from '@tanstack/react-router';
import Layout from '../Layout';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});
