import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { MessagesContextProvider } from './contexts/MessagesContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <MessagesContextProvider>
          <App />
        </MessagesContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
