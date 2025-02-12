import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react"; // Chakra UI for styling
import { BrowserRouter } from "react-router-dom"; // React Router for navigation

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>  {/* ✅ Corrected case */}
      <BrowserRouter>  {/* ✅ Corrected nesting */}
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
