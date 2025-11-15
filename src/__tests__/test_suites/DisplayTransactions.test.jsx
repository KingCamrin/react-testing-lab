// #### Display Transactions Test
// - Create a test suite that will test if transactions are displayed on startup.

import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";
import { describe, it, expect } from 'vitest';

describe("Display Transactions Test", () => {
  it("should display transactions on startup", async () => {
    render(<App />);
    
    // Wait for transactions to load and be displayed on startup
    await waitFor(() => {
      expect(screen.getByText(/paycheck from bob's burgers/i)).toBeInTheDocument();
      expect(screen.getByText(/quinoa bowl/i)).toBeInTheDocument();
    });

    // Verify the transaction table is rendered
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Verify table headers are present
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    
    // Verify transaction data is displayed
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });
});