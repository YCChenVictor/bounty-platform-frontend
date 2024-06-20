import { render } from "@testing-library/react";
import React from "react";
import TaskList from "../../src/task/list";

test("renders without crashing", () => {
  const tasks = ["Task 1", "Task 2", "Task 3"];
  render(<TaskList tasks={tasks} />);
});
