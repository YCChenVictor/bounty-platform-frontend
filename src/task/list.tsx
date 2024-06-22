import React, { useState } from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

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
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((item) => item !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }

    try {
      postTaskUpdate(id, !completed);
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

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
              textDecoration: completedTasks.includes(task.id)
                ? "line-through"
                : "none",
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
