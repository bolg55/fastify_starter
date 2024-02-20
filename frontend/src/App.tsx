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

SuperTokens.init(SuperTokensConfig);

function App() {
  return (
    <Layout>
      <SuperTokensWrapper>
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
          </Routes>
        </Router>
      </SuperTokensWrapper>
    </Layout>
  );
}

export default App;
