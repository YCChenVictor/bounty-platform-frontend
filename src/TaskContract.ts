import { ethers } from "ethers";
import TaskContract from "./contracts/TaskContract.json";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const taskContractAddress = "YOUR_CONTRACT_ADDRESS";

const getTaskContract = async () => {
  const ethereum = global?.window?.ethereum;
  if (!ethereum) {
    throw new Error("Ethereum object not found");
  }
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(
    taskContractAddress,
    TaskContract.abi,
    await signer,
  );
};

export const createTask = async (description: string) => {
  const contract = await getTaskContract();
  const transaction = await contract.createTask(description);
  await transaction.wait();
};

export const completeTask = async (taskId: number) => {
  const contract = await getTaskContract();
  const transaction = await contract.completeTask(taskId);
  await transaction.wait();
};

export const getTasks = async () => {
  const contract = await getTaskContract();
  const taskCount = await contract.taskCount();
  const tasks = [];
  for (let i = 1; i <= taskCount; i++) {
    const task = await contract.tasks(i);
    tasks.push(task);
  }
  return tasks;
};
