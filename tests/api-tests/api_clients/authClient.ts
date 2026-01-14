// import {request} from '@playwright/test'

// export class AuthClient {
//   constructor(private request:any) {}

//   async request_otp(payload:any) {
//     return this.request.post('/api/auth/verify-otp', { data: payload });
//   }
// }

import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init() {
    this.context = await request.newContext({
      baseURL: 'http://localhost:5001'
    });
  }

  get(url: string, token?: string) {
    return this.context.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }

  post(url: string, body: any, token?: string) {
    return this.context.post(url, {
      data: body,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }
}
