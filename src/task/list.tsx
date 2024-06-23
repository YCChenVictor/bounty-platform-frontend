import React from "react";
import { useTasks } from "./taskContext";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = () => {
  const { tasks, updateCompleted } = useTasks();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateCompleted(task.id, task.completed)}
          />
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
