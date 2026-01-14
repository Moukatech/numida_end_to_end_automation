import {test,expect } from '@playwright/test'
import {AuthClient} from './api_clients/authClient'
import {phone_number,validOtp } from '../../test_data/customer_data'


test.describe.serial("Test Auth flow", async () => {

 
  test('verify a user can Request for OTP - success', async ({ request }) => {
    const client = new AuthClient(request);
    const response = await client.request_otp('/api/auth/request-otp', {
      phone_number: phone_number 
    });

    expect(response.status()).toBe(200);
  });


   test('verify otp is validated successfully and session token is generated ', async ({request}) => {
      const client = new AuthClient(request);
      const res = await client.verify_otp("/api/auth/verify-otp",
        {
          phone_number: phone_number ,
          otp: validOtp
    });
   
    const body = await res.json();
    console.log(body)
    console.log(phone_number)
    expect(body.session_token).toBeTruthy();
    expect(res.status()).toBe(200);
  })


  test('Verify OTP - success', async ({ request }) => {
    const response = await request.post('/api/auth/verify-otp', {
      data: {
        phone_number: "0729208685",
        otp: "0000"
      }
    });

    const body = await response.json();
    console.log(body)
    // expect(body.session_token).toBeTruthy();
  });

})