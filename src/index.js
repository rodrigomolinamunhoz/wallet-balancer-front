import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { LoaderProvider } from './context/loaderProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </ChakraProvider>
);
