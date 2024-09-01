import { render } from "@testing-library/react";
import React, { act } from "react";
import App from "../src/App";

it("renders without crashing", () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => ({}),
    }),
  );

  act(() => {
    render(<App />);
  });
});
