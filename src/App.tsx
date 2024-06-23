import React from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Task from "./task/index";
import { TaskProvider } from "./task/taskContext";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function App() {
  return (
    <>
      <TaskProvider>
        <Task />
      </TaskProvider>
    </>
  );
}

export default App;
