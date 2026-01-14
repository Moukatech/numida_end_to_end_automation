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
  console.log(body)
  expect(response.status()).toBe(200);
  expect(body.has_application).toBeDefined();
});


test.describe('Application Status negative tests', () => {

  test('Missing Authorization header', async ({ request }) => {
    const res = await request.get('/api/application/status');
    expect(res.status()).toBe(401);
  });

  test('Invalid token', async ({ request }) => {
    const res = await request.get('/api/application/status', {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    expect(res.status()).toBe(401);
  });


});

