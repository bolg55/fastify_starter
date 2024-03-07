import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import queryClient from './providers/dataFetchingProvider';
import router from './providers/routingProvider';
import Loader from './components/Loader';

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
  return (
    <>
      {auth.isLoading && <Loader text='Loading...' />}
      <RouterProvider router={router} context={{ auth }} />
    </>
  );
};
