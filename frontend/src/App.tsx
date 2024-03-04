import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { SuperTokensConfig } from './config';
import * as reactRouterDom from 'react-router-dom';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { ThirdPartyPasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui';
import Secret from './Secret';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import Home from './Home';
import Layout from './Layout';
import Pricing from './Pricing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
SuperTokens.init(SuperTokensConfig);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SuperTokensWrapper>
          <Toaster richColors position='top-right' closeButton expand={true} />
          <Router>
            <Routes>
              {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
                ThirdPartyPasswordlessPreBuiltUI,
              ])}
              <Route path='/' element={<Home />} />
              <Route
                path='/secret'
                element={
                  <SessionAuth>
                    <Secret />
                  </SessionAuth>
                }
              />
              <Route
                path='/pricing'
                element={
                  <SessionAuth requireAuth={false}>
                    <Pricing />
                  </SessionAuth>
                }
              />
            </Routes>
          </Router>
        </SuperTokensWrapper>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
