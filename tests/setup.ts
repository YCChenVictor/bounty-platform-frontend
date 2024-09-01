window.fetch = jest.fn().mockImplementation((url) => {
  if (url === `${process.env.REACT_APP_BACKEND_URL}/tasks`) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: "Task 1" },
          { id: 2, name: "Task 2" },
        ]),
    });
  }
  // Add more URL checks if needed
  return Promise.reject(new Error("Unknown URL"));
});
