import { ethers } from "ethers";
import TaskContract from "./contracts/TaskContract.json";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const taskContractAddress = process.env.REACT_APP_TASK_CONTRACT_ADDRESS;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

if (!taskContractAddress || !privateKey) {
  throw new Error("Missing environment variables");
}

const getTaskContract = async () => {
  const ethereum = global?.window?.ethereum;

  let provider;
  let signer;

  if (ethereum) {
    // Use MetaMask (or another wallet) if available
    provider = new ethers.BrowserProvider(ethereum);
    signer = await provider.getSigner();
  } else {
    // Fallback to Hardhat local network if MetaMask is not available
    provider = new ethers.JsonRpcProvider("http://localhost:8545");

    // Use one of the default Hardhat accounts
    const wallet = new ethers.Wallet(privateKey, provider);
    signer = wallet;
  }

  return new ethers.Contract(taskContractAddress, TaskContract.abi, signer);
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
  try {
    const contract = await getTaskContract();
    const taskCount = await contract.taskCount();
    const tasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.tasks(i);
      tasks.push(task);
    }
    return tasks;
  } catch (e) {
    console.error(e);
    return [];
  }
};
