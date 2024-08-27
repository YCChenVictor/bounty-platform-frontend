import { ethers } from "ethers";
// import TaskContract from "./artifacts/contracts/TaskContract.sol/TaskContract.json";

const taskContractAddress = "YOUR_CONTRACT_ADDRESS";

// const getTaskContract = () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   return new ethers.Contract(taskContractAddress, TaskContract.abi, signer);
// };

export const createTask = async (description: string) => {
//   const contract = getTaskContract();
//   const transaction = await contract.createTask(description);
//   await transaction.wait();
  return 'createTask';
};

export const completeTask = async (taskId: number) => {
//   const contract = getTaskContract();
//   const transaction = await contract.completeTask(taskId);
//   await transaction.wait();
  return 'completeTask';
};

export const getTasks = async () => {
//   const contract = getTaskContract();
//   const taskCount = await contract.taskCount();
//   const tasks = [];
//   for (let i = 1; i <= taskCount; i++) {
//     const task = await contract.tasks(i);
//     tasks.push(task);
//   }
//   return tasks;
  return 'getTasks';
};
