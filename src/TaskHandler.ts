import { createTaskInBackend } from "./TaskBackend";
import { createTaskInBlockchain } from "./TaskContract";

interface BackendRecord {
  id: number;
  name: string;
  completed: boolean;
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
) => {
  try {
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
