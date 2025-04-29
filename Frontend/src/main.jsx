import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

// Simple test component without any external dependencies
const TestComponent = () => {
  console.log('TestComponent is rendering');
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: 'white',
      color: 'black'
    }}>
      <h1>Basic Test</h1>
      <p>This should appear without any styling libraries</p>
    </div>
  );
};

console.log('Starting application...');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  );
  console.log('App rendered with ChakraProvider and BrowserRouter');
} else {
  console.error('Root element not found!');
}
