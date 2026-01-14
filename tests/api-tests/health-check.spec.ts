import { test, expect } from '@playwright/test';

test('verify health status of the application', async ({ request }) => {
  const response = await request.get('/api/health');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.status).toBe('healthy');
  expect(body.timestamp).toBeTruthy();
});
