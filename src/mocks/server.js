import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock handlers for API requests
export const restHandlers = [
  // GET transactions
  http.get('http://localhost:6001/transactions', () => {
    return HttpResponse.json([
      {
        id: 1,
        date: "2019-12-01",
        description: "Paycheck from Bob's Burgers",
        category: "Income",
        amount: 1000
      },
      {
        id: 2,
        date: "2019-12-01",
        description: "South by Southwest Quinoa Bowl at Fresh & Co",
        category: "Food",
        amount: -10.55
      }
    ]);
  }),

  // POST new transaction
  http.post('http://localhost:6001/transactions', async ({ request }) => {
    const newTransaction = await request.json();
    return HttpResponse.json({
      id: 3,
      ...newTransaction
    }, { status: 201 });
  })
];

// Create mock server
export const server = setupServer(...restHandlers);
