const createTaskInBackend = async (
  name: string,
  owner: string,
  repo: string,
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        owner,
        repo,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Task created in backend:", data);
    return data.id;
  } catch (error) {
    console.error("Error creating task in backend:", error);
  }
};

export { createTaskInBackend };
