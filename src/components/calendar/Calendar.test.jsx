import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Calendar from "./Calendar";

describe("Calendar Component", () => {
  const mockOnDateSelect = vi.fn();
  const testDate = new Date(2024, 0, 15); // 15 Jan 2024

  test("renders month and year correctly", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  test("renders weekdays correctly", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    const weekdayHeaders = screen.getAllByRole("columnheader");
    expect(weekdayHeaders).toHaveLength(7);

    const weekdayText = weekdayHeaders.map((el) => el.textContent);
    expect(weekdayText).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
  });

  test("highlights the selected date", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    const selectedCell = screen.getByText("15");
    expect(selectedCell).toHaveClass("selected");
  });

  test("calls onDateSelect when a date is clicked", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    fireEvent.click(screen.getByText("10"));
    expect(mockOnDateSelect).toHaveBeenCalledTimes(1);
    expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 0, 10));
  });

  test("navigates to next month", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    fireEvent.click(screen.getByText("›"));
    expect(screen.getByText("February 2024")).toBeInTheDocument();
  });

  test("navigates to previous year", () => {
    render(<Calendar date={testDate} onDateSelect={mockOnDateSelect} />);

    fireEvent.click(screen.getByText("«"));
    expect(screen.getByText("January 2023")).toBeInTheDocument();
  });
});
