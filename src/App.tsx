import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { TaskForm } from './task/form';
import { TaskList } from './task/list';

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if ((window).ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  const handleTaskCreate = (name: string) => {
    setTasks([...tasks, name]);
  };

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <TaskForm onTaskCreate={handleTaskCreate} />
        <TaskList tasks={tasks} />
      </div>
    </>
  );
}

export default App;
