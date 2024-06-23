import React from "react";
import TaskForm from "./form";
import TaskList from "./list";
import { useTasks } from "./taskContext";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function Task() {
  const { tasks } = useTasks();

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
