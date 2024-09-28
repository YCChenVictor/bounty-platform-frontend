import { createTaskInBackend } from "./TaskBackend";
import { createTaskInBlockchain } from "./TaskContract";

interface BackendRecord {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskForRender {
  id: number;
  name: string;
  backendId: number;
  blockchainId: number;
  backendCompleted?: boolean;
  blockchainCompleted?: boolean;
}

const fetchTasksFromBackend = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
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

const handleCreateTask = async (
  newTaskName: string,
  newTaskOwner: string,
  newTaskRepo: string,
  newPaymentAmountRepo: number,
  setTasks: (tasks: TaskForRender[]) => void,
  tasks: TaskForRender[],
) => {
  try {
    const newTask = {
      id: 0,
      name: newTaskName,
      backendId: 0,
      blockchainId: 0,
      backendCompleted: false,
      blockchainCompleted: false,
    };
    setTasks([...tasks, newTask]);

    const backendId = await createTaskInBackend(
      newTaskName,
      newTaskOwner,
      newTaskRepo,
    );
    await createTaskInBlockchain(backendId, newPaymentAmountRepo);
    await fetchTasksFromBackend();
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export { fetchTasksFromBackend, handleCreateTask };
