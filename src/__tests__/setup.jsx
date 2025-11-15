import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { server } from '../mocks/server'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that are declared in tests
afterEach(() => {
    cleanup();
    server.resetHandlers();
})

// Clean up after the tests are finished
afterAll(() => server.close())

global.setFetchResponse = (val) => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }))
}