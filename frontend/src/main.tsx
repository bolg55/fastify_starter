import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { SuperTokensConfig } from './providers/authProvider';
import queryClient from './providers/dataFetchingProvider';
import router from './providers/routingProvider';
import { Toaster } from 'sonner';

SuperTokens.init(SuperTokensConfig);

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SuperTokensWrapper>
          <Toaster richColors position='top-right' closeButton expand={true} />
          <RouterProvider router={router} />
        </SuperTokensWrapper>
      </QueryClientProvider>
    </StrictMode>
  );
}
