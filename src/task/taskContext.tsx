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
