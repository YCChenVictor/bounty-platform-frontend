import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Task from "../src/Task";

it("renders with all functions", async () => {
  render(<Task />);
  expect(screen.getByText("Task Manager")).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText("New Task Name"), {
    target: { value: "Test Task" },
  });
  fireEvent.change(screen.getByPlaceholderText("New Task Owner"), {
    target: { value: "Test Owner" },
  });
  fireEvent.change(screen.getByPlaceholderText("New Task Repo"), {
    target: { value: "Test Repo" },
  });
  fireEvent.change(screen.getByPlaceholderText("New Payment Amount"), {
    target: { value: 100 },
  });
  fireEvent.click(screen.getByText("Create Task"));
  expect(screen.getByText("Test Task")).toBeInTheDocument();
  jest.restoreAllMocks();
});
