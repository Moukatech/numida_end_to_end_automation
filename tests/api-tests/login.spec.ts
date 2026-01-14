import {test,expect } from '@playwright/test'
import {ApiClient} from './api_clients/authClient'
import { generateCustomerData,phone_number } from '../../test_data/customer_data'

// test('verify otp ', async ({request}) => {
//     const client = new ApiClient(request);
//     const res = await client.request_otp({
//     "phone_number": "0729208685",
//    "otp": "0000"
//   });
//   console.log(await res.json())
//   expect(res.status()).toBe(200);
// })


test('Request OTP - success', async ({ request }) => {
  const response = await request.post('/api/auth/request-otp', {
    data: { phone_number: phone_number }
  });

  expect(response.status()).toBe(200);
});