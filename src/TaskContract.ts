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
    const privateKey = "your-hardhat-private-key-here"; // Replace with a private key from Hardhat node
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
  const contract = await getTaskContract();
  const taskCount = await contract.taskCount();
  const tasks = [];
  for (let i = 1; i <= taskCount; i++) {
    const task = await contract.tasks(i);
    tasks.push(task);
  }
  return tasks;
};
