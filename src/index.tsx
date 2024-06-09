import React from 'react';
import { createRoot } from 'react-dom/client'
  
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

const element = <h1>Hello World</h1>;
createRoot(rootElement).render(
  element
)
