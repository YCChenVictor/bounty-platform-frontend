import { ethers } from "ethers";
import TaskContract from "./contracts/taskContract.json";
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

const helloWorld = async () => {
  const contract = await getTaskContract();
  const message = await contract.helloWorld();
  console.log(message);
};

const createTask = async (description: string) => {
  const contract = await getTaskContract();
  const transaction = await contract.createTask(description);
  await transaction.wait();
};

const completeTask = async (taskId: number) => {
  const contract = await getTaskContract();
  const transaction = await contract.completeTask(taskId);
  await transaction.wait();
};

const getTasks = async () => {
  try {
    const contract = await getTaskContract();
    const tasks = await contract.listTasks();
    console.log(tasks);
    return tasks;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { helloWorld, getTaskContract, createTask, completeTask, getTasks };
