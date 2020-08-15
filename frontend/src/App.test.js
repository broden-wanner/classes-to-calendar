import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Classes to Calendar", () => {
  const { getAllByText } = render(<App />);
});
