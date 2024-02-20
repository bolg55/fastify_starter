import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { SuperTokensConfig } from './config';
import * as reactRouterDom from 'react-router-dom';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { ThirdPartyPasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui';

SuperTokens.init(SuperTokensConfig);

function App() {
  return (
    <SuperTokensWrapper>
      <Router>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
            ThirdPartyPasswordlessPreBuiltUI,
          ])}
          <Route path='/' element={<h1>Fastify Starter</h1>} />
        </Routes>
      </Router>
    </SuperTokensWrapper>
  );
}

export default App;
