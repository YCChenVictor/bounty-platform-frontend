import React, { useState } from "react";

interface TaskListProps {
  tasks: string[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const markAsCompleted = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((item) => item !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={completedTasks.includes(index)}
            onChange={() => markAsCompleted(index)}
          />
          <span
            style={{
              textDecoration: completedTasks.includes(index)
                ? "line-through"
                : "none",
            }}
          >
            {task}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
