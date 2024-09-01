import { render } from "@testing-library/react";
import React, { act } from "react";
import App from "../src/App";

it("renders without crashing", async () => {
  await act(async () => {
    render(<App />);
  });
});
