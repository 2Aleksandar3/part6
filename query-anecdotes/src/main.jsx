import ReactDOM from 'react-dom/client'
import React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './components/NotificationContext' 

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);