import './index.css';
import { bootstrapGlobalGuards } from './shared/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

bootstrapGlobalGuards();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
