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
    expect(body.application.full_name).toBe(payload.full_name)
    expect(['approved', 'rejected', 'pending']).toContain(body.application.status);
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


test.describe('Payload validations', () => {

  test('Full name validation', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}` },
      data: { full_name: 'J' }
    });
    const body = await res.json();
    expect(body.errors.full_name).toBe('Full name must be at least 2 characters')
    expect(res.status()).toBe(400);
  });

  test('minimum Loan amount validation', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}` },
      data: { loan_amount: 999 }
    });
    const body = await res.json();
    expect(body.errors.loan_amount).toBe('Loan amount must be at least 1000')
    expect(res.status()).toBe(400);
  });

  test('Maximum Loan amount validation ', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}` },
      data: { loan_amount: 5000001 }
    });
    const body = await res.json();
    expect(body.errors.loan_amount).toBe('Loan amount cannot exceed 5000000')
    expect(res.status()).toBe(400);
  });

  test('Invalid loan term', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}`},
      data: { loan_term: 48 }
    });
    const body = await res.json();
    expect(body.errors.loan_term).toBe('Loan term must be one of: 15, 30, 45, 60')
    expect(res.status()).toBe(400);
  });

  test('Underage applicant (<18)', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}` },
      data: { date_of_birth: '2020-01-01' }
    });
    const body = await res.json();
    expect(body.errors.date_of_birth).toBe('Must be at least 18 years old')
    expect(res.status()).toBe(400);
  });

  test('Invalid email format', async ({ request }) => {
    const res = await request.post('/api/application/submit', {
      headers: {  Authorization: `Bearer ${token}` },
      data: { email: 'invalid-email' }
    });
    const body = await res.json();
    expect(body.errors.email).toBe('Invalid email format')
    expect(res.status()).toBe(400);
  });


   test('verify correct error on duplicate submittion', async ({ request }) => {
    const response = await request.post('/api/application/submit', {
        data: payload,
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
     const response2 = await request.post('/api/application/submit', {
        data: payload,
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const body = await response2.json();
    expect(response.status()).toBe(400);
    expect(body.error).toBe("Application already exists")
    
    });
});
