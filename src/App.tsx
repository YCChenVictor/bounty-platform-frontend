import React, { useState, useEffect } from "react";
// import { createTask as createTaskInBlockchain, completeTask as completeTaskInBlockchain } from "./TaskContract";

interface Task {
  id: number;
  name: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    fetchTasksFromBackend();
  }, []);

  const fetchTasksFromBackend = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks from backend:", error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await createTaskInBackend(newTaskName);
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const createTaskInBackend = async (name: string) => {
    try {
      const response = await fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log("Task created in backend:", data);
    } catch (error) {
      console.error("Error creating task in backend:", error);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      // await completeTaskInBlockchain(taskId);
      await updateTaskInBackend(taskId, { completed: true });
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const updateTaskInBackend = async (
    taskId: number,
    updates: { newName?: string; completed?: boolean },
  ) => {
    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      console.log("Task updated in backend:", data);
    } catch (error) {
      console.error("Error updating task in backend:", error);
    }
  };

  const handleUpdateTask = async (taskId: number, newName: string) => {
    try {
      await updateTaskInBackend(taskId, { newName });
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasksFromBackend();
    } catch (error) {
      console.error("Error deleting task:", error);
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
      <button onClick={handleCreateTask}>Create Task</button>
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
              <button onClick={() => handleDeleteTask(task.id)}>
                Delete Task
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
