import { test, expect } from '@playwright/test';
import { generateCustomerData,phone_number,validOtp } from '../../test_data/customer_data'

let token: string;

test.beforeAll(async ({ request }) => {
  await request.post('/api/auth/request-otp', {
    data: { phone_number: phone_number }
  });

  const res = await request.post('/api/auth/verify-otp', {
    data: { phone_number: phone_number, otp: validOtp }
  });

  token = (await res.json()).session_token;
});

test('Get application status', async ({ request }) => {
  const response = await request.get('/api/application/status', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.has_application).toBeDefined();
});
