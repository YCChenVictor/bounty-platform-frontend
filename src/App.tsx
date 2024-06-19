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
    initializeProvider();
    fetchTasks();
  }, []);

  const initializeProvider = async () => {
    if ((window).ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  };

  const handleTaskCreate = (name: string) => {
    setTasks([...tasks, name]);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const tasks = await response.json();
      setTasks(tasks.map((task: { name: string }) => task.name));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
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
