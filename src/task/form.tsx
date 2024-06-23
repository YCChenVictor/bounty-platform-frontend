import React, { useState } from "react";

const TaskForm: React.FC = () => {
  const [newTaskName, setNewTaskName] = useState("");

  const handleNewTaskNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTaskName(event.target.value);
  };

  const handleNewTaskSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!process.env.REACT_APP_BACKEND_URL) {
      throw new Error("BACKEND_URL is not set");
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTaskName }),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(message);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          value={newTaskName}
          onChange={handleNewTaskNameChange}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
