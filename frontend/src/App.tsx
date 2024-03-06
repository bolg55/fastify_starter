import { QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import queryClient from './providers/dataFetchingProvider';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from '@tanstack/react-router';
import router from './providers/routingProvider';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='top-right' closeButton expand={true} />
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
