import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

createRoot(rootElement).render(<App />);
