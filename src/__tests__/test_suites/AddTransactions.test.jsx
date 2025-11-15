// #### Add Transactions Test
// - Create a test suite that will test:
//   - If new transactions are added to the frontend.
//   - If a POST request was called.
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import { describe, it, expect, vi } from 'vitest';

describe("Add Transactions Test", () => {
  it("should render the add transaction form with all required fields", async () => {
    render(<App />);

    // Wait for initial transactions to load
    await waitFor(() => {
      expect(screen.getByText(/paycheck/i)).toBeInTheDocument();
    });

    // Check that all form elements exist
    expect(document.querySelector('input[type="date"]')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add transaction/i })).toBeInTheDocument();
  });

  it("should allow user to interact with form fields", async () => {
    render(<App />);

    // Wait for app to load
    await waitFor(() => {
      expect(screen.getByText(/paycheck/i)).toBeInTheDocument();
    });

    // Test that user can type in form fields
    const user = userEvent.setup();
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const categoryInput = screen.getByPlaceholderText(/category/i);
    const amountInput = screen.getByPlaceholderText(/amount/i);
    
    await user.type(descriptionInput, "Test Transaction");
    await user.type(categoryInput, "Test Category");  
    await user.type(amountInput, "25.00");

    // Verify values were entered
    expect(descriptionInput).toHaveValue("Test Transaction");
    expect(categoryInput).toHaveValue("Test Category");
    expect(amountInput).toHaveValue(25);
  });
});