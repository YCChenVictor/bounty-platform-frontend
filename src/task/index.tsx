import React, { useEffect, useState } from "react";
import TaskForm from "./form";
import TaskList from "./list";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
    <>
      <h1>Tasks</h1>
      <div>
        <TaskForm />
        <TaskList tasks={tasks} />
      </div>
    </>
  );
}

export default Task;
