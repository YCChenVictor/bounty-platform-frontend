import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../abis/Task.json";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

// Define an interface for the context value
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateCompleted: (id: number, completed: boolean) => void;
}

// Use the interface in the createContext call
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {
    throw new Error("addTask() not implemented");
  },
  updateCompleted: (id: number, completed: boolean) => {
    console.log(id);
    console.log(completed);
    throw new Error("updateCompleted() not implemented");
  },
});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const tasks = await response.json();
      const orderedTasks = tasks.sort((a: Task, b: Task) => a.id - b.id);
      setTasks(orderedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const postTaskUpdate = async (id: number, completed: boolean) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`;
    const data = { completed };

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to post task update");
      }

      console.log("Task update successfully sent to the backend.");
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error sending task update to the backend:", error);
    }
  };

  const updateCompleted = (id: number, completed: boolean) => {
    try {
      postTaskUpdate(id, !completed);
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
      if (completed) {
        // const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        console.log(contractABI);
        // const taskContractAddress = "0xYourContractAddressHere";
        // const taskContract = new ethers.Contract(
        //   taskContractAddress,
        //   taskContractABI,
        //   provider,
        // );
        // const signer = provider.getSigner();
        // const taskContractWithSigner = taskContract.connect(signer);

        // const isOwner = await taskContractWithSigner.isOwner();
        // if (!isOwner) {
        //   console.error("User is not the owner or authorized.");
        //   return;
        // }

        // async function markTaskCompleted() {
        //   const tx = await taskContractWithSigner.markTaskCompleted();
        //   await tx.wait(); // Wait for the transaction to be mined
        // }

        // async function paySalary() {
        //   const tx = await taskContractWithSigner.paySalary();
        //   await tx.wait(); // Wait for the transaction to be mined
        // }

        // markTaskCompleted().then(() => {
        //   console.log("Task marked as completed.");
        //   paySalary().then(() => {
        //     console.log("Salary paid.");
        //   });
        // });
      }
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};
