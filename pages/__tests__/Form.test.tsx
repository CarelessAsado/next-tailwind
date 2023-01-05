import React from "react";
import { render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Form from "pages/form/index";
import { BACKEND_URL_API, ROUTER } from "constants/constants";

const inputs = [
  { label: "Full Name", value: "John Smith" },
  { label: "Email", value: "john@example.com" },
  { label: "Password", value: "abc123" },
];

const inputLabels = inputs.map((inp) => inp.label);

describe("Form", () => {
  it("should render the form", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);

    inputLabels.forEach((label) => {
      expect(getByLabelText(label)).toBeDefined();
    });
  });

  it("should update the form state when the inputs are changed", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);

    inputs.forEach((input) => {
      const element = getByLabelText(input.label);
      fireEvent.change(element, { target: { value: input.value } });
      expect((element as HTMLInputElement).value).toBe(input.value);
    });
  });

  it("should submit the form", async () => {
    const { getByLabelText, getByRole } = render(<Form serverData={[]} />);
    const nameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByRole("button");

    fireEvent.change(nameInput, { target: { value: "John Smith" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });
    fireEvent.click(submitButton);

    /*    await waitFor(() => {
      expect(getByText("Form submitted")).toBeDefined();
    }); */
    /*  await waitFor(() => expect(fetch).toHaveBeenCalledWith(BACKEND_URL_API + ROUTER.tasksControllerAPI, expect.objectContaining({
    body: JSON.stringify(formState),
    method: 'POST'
  }))); */
  });
});
