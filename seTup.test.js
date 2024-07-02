// setupTests.js
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Mock for window and history
global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

global.history = {
  pushState: jest.fn()
};
