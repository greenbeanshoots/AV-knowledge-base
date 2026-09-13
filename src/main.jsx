import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/App.jsx';
import './styles.css';
import { ToastProvider } from './components/ui/Toast.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider><App /></ToastProvider>
    </HashRouter>
  </React.StrictMode>
);
