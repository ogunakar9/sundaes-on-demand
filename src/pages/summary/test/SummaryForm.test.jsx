import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no icecream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no icecream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no icecream will actually be delivered/i)
  );
});
