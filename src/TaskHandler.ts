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

export { fetchTasksFromBackend };
