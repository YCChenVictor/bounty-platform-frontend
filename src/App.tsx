import React, { useState, useEffect } from "react";
import {
  helloWorld,
  getTasks as getTasksFromBlockchain,
  createTask as createTaskInBlockchain,
} from "./TaskContract";

interface Task {
  id: number;
  name: string;
  backendId: number;
  blockchainId: number;
}

interface BlockchainTask {
  0: bigint;
  1: string;
  2: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    helloWorld();
    handleListTasks();
  }, []);

  const handleListTasks = async () => {
    const backendTasks = await fetchTasksFromBackend();
    const blockchainTasks = await getTasksFromBlockchain();
    const result = blockchainTasks.map((blockchainTask: BlockchainTask[]) => {
      const mapBackendTask = backendTasks[Number(blockchainTask[0])];
      return {
        backendId: mapBackendTask.id,
        blockchainId: blockchainTask[0],
        name: mapBackendTask.name,
        backendCompleted: mapBackendTask.completed,
        blockchainCompleted: blockchainTask[2],
      };
    });
    debugger;
    setTasks(result);
    // TBC, after this set task, render it in the UI
  };

  const fetchTasksFromBackend = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      );
      const data = await response.json();
      const transformedData = data.reduce((acc: Task[], backendTask: Task) => {
        acc[backendTask.id] = {
          id: backendTask.id,
          backendId: backendTask.id,
          name: backendTask.name,
          blockchainId: 0,
        };
        return acc;
      }, []);
      return transformedData;
    } catch (error) {
      console.error("Error fetching tasks from backend:", error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const backendId = await createTaskInBackend(newTaskName);
      await createTaskInBlockchain(backendId, newTaskName);
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const createTaskInBackend = async (name: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task created in backend:", data);
      return data.id;
    } catch (error) {
      console.error("Error creating task in backend:", error);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      // await completeTaskInBlockchain(taskId);
      await completeTaskInBackend(taskId, { completed: true });
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const completeTaskInBackend = async (
    taskId: number,
    updates: { newName?: string; completed?: boolean },
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        },
      );
      const data = await response.json();
      console.log("Task updated in backend:", data);
    } catch (error) {
      console.error("Error updating task in backend:", error);
    }
  };

  const handleUpdateTask = async (taskId: number, newName: string) => {
    try {
      await completeTaskInBackend(taskId, { newName });
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="New Task Name"
      />
      <button onClick={() => handleCreateTask()}>Create Task</button>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              />
              <button onClick={() => handleCompleteTask(task.id)}>
                Complete Task
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
