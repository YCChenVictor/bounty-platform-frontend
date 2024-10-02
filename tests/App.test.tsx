// App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

test("renders Home component for the default route", () => {
  render(<App />);
  expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
});

test("renders Task component for the /tasks route", () => {
  window.history.pushState({}, "Task page", "/tasks");
  render(<App />);
  expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
});
