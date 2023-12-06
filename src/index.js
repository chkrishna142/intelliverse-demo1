import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

export const baseURL = 'https://backend-ripik.com/api/'; //Dev backend URL

const root = ReactDOM.createRoot(document.getElementById('root'));

mixpanel.init('b9653e348dc8ab3eb990b311b1e69b98', {
  api_host: 'https://drdun9bya6vw5.cloudfront.net',
  persistence: 'localStorage',
});

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);

reportWebVitals();
