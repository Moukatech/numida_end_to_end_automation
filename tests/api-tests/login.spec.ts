import {test,expect } from '@playwright/test'
import {AuthClient} from './api_clients/authClient'
import {phone_number,validOtp } from '../../test_data/customer_data'


test.describe.serial("Test Auth flow", async () => {

 
  test('verify a user can Request for OTP - success', async ({ request }) => {
    const client = new AuthClient(request);
    const response = await client.request_otp({
      phone_number: phone_number 
    });

    expect(response.status()).toBe(200);
  });


   test('verify otp is validated successfully and session token is generated ', async ({request}) => {
      const client = new AuthClient(request);
      const res = await client.verify_otp(
        {
          phone_number: phone_number ,
          otp: validOtp
    });
   
    const body = await res.json();
    expect(body.session_token).toBeTruthy();
    expect(res.status()).toBe(200);
  })


 
})

test.describe('Auth Negative Scenarios', () => {

  test('Request OTP with missing phone number', async ({ request }) => {
     const client = new AuthClient(request);
      const res = await client.request_otp( { data: {} });
    expect(res.status()).toBe(400);
  });

  test('Request OTP with invalid phone format', async ({ request }) => {
     const client = new AuthClient(request);
      const res = await client.request_otp({
      data: { phone_number: '0700ABC' }
    });
    expect(res.status()).toBe(400);
  });

  test('Verify OTP with wrong OTP', async ({ request }) => {
    const client = new AuthClient(request);
      const res = await client.verify_otp( {
      data: { phone_number: '+256700000000', otp: '1234' }
    });
    expect(res.status()).toBe(401);
  });

  test('Verify OTP with missing OTP', async ({ request }) => {
    const client = new AuthClient(request);
      const res = await client.verify_otp({
      data: { phone_number: '+256700000000' }
    });
    expect(res.status()).toBe(400);
  });

  test('Verify OTP with missing phone number', async ({ request }) => {
    const client = new AuthClient(request);
      const res = await client.verify_otp({
      data: { otp: '0000' }
    });
    expect(res.status()).toBe(400);
  });

});
