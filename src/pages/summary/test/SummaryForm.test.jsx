import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  expect(confirmButton).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("input disables / enables button", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", () => {});
