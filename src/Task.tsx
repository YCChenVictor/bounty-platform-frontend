import React, { useState, useEffect } from "react";
import { fetchTasksFromBackend, handleCreateTask } from "./TaskHandler";
import {
  completeTask as completeTaskInBlockchain,
  getTasks as getTasksFromBlockchain,
} from "./TaskContract";

interface BackendRecord {
  id: number;
  name: string;
  completed: boolean;
}

interface BlockchainTask {
  0: bigint; // The task id
  1: string; // The task name
  2: boolean; // The task completed status
}

interface TaskForRender {
  id: number;
  name: string;
  backendId: number;
  blockchainId: number;
  backendCompleted?: boolean;
  blockchainCompleted?: boolean;
}

const handleListTasks = async (setTasks: (tasks: TaskForRender[]) => void) => {
  try {
    const backendTasks = await fetchTasksFromBackend();
    const blockchainTasks = await getTasksFromBlockchain();
    const result = blockchainTasks.map((blockchainTask: BlockchainTask) => {
      const mapBackendTask = backendTasks.find(
        (backendTask: BackendRecord) =>
          Number(blockchainTask[0]) === backendTask.id,
      );
      return {
        backendId: mapBackendTask.id,
        blockchainId: Number(blockchainTask[0]),
        name: mapBackendTask.name,
        backendCompleted: mapBackendTask.completed,
        blockchainCompleted: blockchainTask[1],
      };
    });
    setTasks(result);
  } catch (error) {
    console.error("Error listing tasks:", error);
  }
};

function App() {
  const [tasks, setTasks] = useState<TaskForRender[]>([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskOwner, setNewTaskOwner] = useState("");
  const [newTaskRepo, setNewTaskRepo] = useState("");
  const [newPaymentAmountRepo, setNewPaymentAmountRepo] = useState(0);

  useEffect(() => {
    handleListTasks(setTasks);
  }, []);

  const fetchTasksFromBackend = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      );
      const records = await response.json();
      const transformedData = records.map((record: BackendRecord) => {
        return {
          id: record.id,
          name: record.name,
          completed: record.completed,
        };
      });
      return transformedData;
    } catch (error) {
      console.error("Error fetching tasks from backend:", error);
    }
  };

  const handleCompleteTask = async (
    taskIdBackend: number,
    taskIdBlockchain: number,
  ) => {
    try {
      await completeTaskInBlockchain(taskIdBlockchain);
      await completeTaskInBackend(taskIdBackend, { completed: true });
      await fetchTasksFromBackend();
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

  // No use for now
  // const handleUpdateTask = async (taskId: number, newName: string) => {
  //   try {
  //     await completeTaskInBackend(taskId, { newName });
  //     fetchTasksFromBackend();
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  const booleanToText = (value: boolean | undefined): string =>
    value ? "Yes" : "No";

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="New Task Name"
      />
      <input
        type="text"
        value={newTaskOwner}
        onChange={(e) => setNewTaskOwner(e.target.value)}
        placeholder="New Task Owner"
      />
      <input
        type="text"
        value={newTaskRepo}
        onChange={(e) => setNewTaskRepo(e.target.value)}
        placeholder="New Task Repo"
      />
      <input
        type="number"
        value={newPaymentAmountRepo}
        onChange={(e) => setNewPaymentAmountRepo(Number(e.target.value))}
        placeholder="New Payment Amount"
      />
      <button
        onClick={() =>
          handleCreateTask(
            newTaskName,
            newTaskOwner,
            newTaskRepo,
            newPaymentAmountRepo,
            setTasks,
            tasks,
          )
        }
      >
        Create Task
      </button>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <span>{task.name}</span>
              <span>{booleanToText(task.backendCompleted)}</span>
              <span>{booleanToText(task.blockchainCompleted)}</span>
              <button
                onClick={() =>
                  handleCompleteTask(task.backendId, task.blockchainId)
                }
              >
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
export { handleListTasks, handleCreateTask, fetchTasksFromBackend };
