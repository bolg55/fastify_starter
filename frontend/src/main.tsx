import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import SuperTokens from 'supertokens-web-js';
import './index.css';
import { SuperTokensConfig } from './providers/authProvider';
import queryClient from './providers/dataFetchingProvider';
import router from './providers/routingProvider';
import { AuthProvider } from './context/AuthContext';

SuperTokens.init(SuperTokensConfig);

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position='top-right' closeButton expand={true} />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
