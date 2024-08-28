import React, { useState, useEffect } from "react";
import { createTask, completeTask, getTasks } from "./TaskContract";

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    // setTasks(loadedTasks);
  };

  const handleCreateTask = async () => {
    await createTask(description);
    setDescription("");
    loadTasks();
  };

  const handleCompleteTask = async (taskId: number) => {
    await completeTask(taskId);
    loadTasks();
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {/* {tasks.map((task) => (
          <li key={task.id}>
            {task.description} - {task.isCompleted ? "Completed" : "Incomplete"}
            {!task.isCompleted && (
              <button onClick={() => handleCompleteTask(task.id)}>
                Complete
              </button>
            )}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
