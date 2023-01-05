//this fixed the following Jest error: "ReferenceError: TextEncoder is not defined "

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Form from "pages/form/index";

describe("Form", () => {
  it("should render the form", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);
    expect(getByLabelText("Full Name")).toBeDefined();
    expect(getByLabelText("Email")).toBeDefined();
    expect(getByLabelText("Password")).toBeDefined();
  });

  it("should update the form state when the inputs are changed", () => {
    const { getByLabelText } = render(<Form serverData={[]} />);
    const nameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(nameInput, { target: { value: "John Smith" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });

    expect((nameInput as HTMLInputElement).value).toBe("John Smith");
    expect((emailInput as HTMLInputElement).value).toBe("john@example.com");
    expect((passwordInput as HTMLInputElement).value).toBe("abc123");
  });

  it("should submit the form", async () => {
    const { getByLabelText, getByText } = render(<Form serverData={[]} />);
    const nameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Smith" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "abc123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Form submitted")).toBeDefined();
    });
  });
});
