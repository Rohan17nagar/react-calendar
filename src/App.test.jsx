import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "./App";

describe("Calendar integration", () => {
  test("opens calendar on input click", () => {
    render(<App />);

    fireEvent.click(screen.getByPlaceholderText("DD-MM-YYYY"));
    expect(screen.getByText(/\d{4}/)).toBeInTheDocument();
  });

  test("selecting date updates input", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("DD-MM-YYYY");

    fireEvent.click(input);
    fireEvent.click(screen.getByText("15"));

    expect(input.value).toMatch(/\d{2}-\d{2}-\d{4}/);
  });

  test("calendar closes on outside click", () => {
    render(<App />);

    fireEvent.click(screen.getByPlaceholderText("DD-MM-YYYY"));
    fireEvent.mouseDown(document.body);

    expect(
      screen.queryByText(/January|February|March/i)
    ).not.toBeInTheDocument();
  });
});
