// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const rootElement = document.getElementById('root'); // Get the root element
const root = createRoot(rootElement); // Create a root using createRoot

root.render(<App />);