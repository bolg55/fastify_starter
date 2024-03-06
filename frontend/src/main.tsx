import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import SuperTokens from 'supertokens-web-js';
import App from './App';
import './index.css';
import { SuperTokensConfig } from './providers/authProvider';

SuperTokens.init(SuperTokensConfig);

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
