import { test, expect } from '@playwright/test';
import { generateCustomerData,phone_number,validOtp } from '../../test_data/customer_data'

let token: string;
const payload = await generateCustomerData()

test.beforeAll(async ({ request }) => {
  await request.post('/api/auth/request-otp', {
    data: { phone_number: phone_number }
  });

  const res = await request.post('/api/auth/verify-otp', {
    data: { phone_number: phone_number, otp: validOtp }
  });
  console.log(await res.json())
  token = (await res.json()).session_token;
});


test.describe.serial("Test loan submission flow", async () => {
    

    test('Submit application - approved flow', async ({ request }) => {
    const response = await request.post('/api/application/submit', {
        data: payload,
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.application.status).toBe('approved');
    });

    test('Submit duplicate application - error', async ({ request }) => {
    const response = await request.post('/api/application/submit', {
        data: payload,
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    expect(response.status()).toBe(400);
    });

})