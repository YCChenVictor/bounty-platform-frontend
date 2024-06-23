import React, { createContext, useContext, useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

// Define an interface for the context value
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
}

// Use the interface in the createContext call
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {
    throw new Error("addTask() not implemented");
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
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
