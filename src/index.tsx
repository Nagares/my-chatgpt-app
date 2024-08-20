import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Убедитесь, что импортируете ваш главный компонент

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  
);
