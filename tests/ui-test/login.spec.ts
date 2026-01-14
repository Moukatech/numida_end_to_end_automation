import {test, expect} from '@playwright/test'

import { Login } from './page_objects/login'
import { generateCustomerData,phone_number } from '../../test_data/customer_data'

test('start application successfully', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()

})

test ('verify first time user can log in successfully', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login(phone_number, "0000")
    await expect(page.locator('//*[@id="root"]/div/div/h2')).toContainText("Personal Details")
   
})

test ('verify correct error is displayed when using an invalid otp', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login("0728494555", "8800")
    await expect (page.locator('.error-message')).toContainText("Invalid OTP")
   
})

test ('verify correct error is displayed when using invalid phone number', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.enter_phone_number("0728494555")
    await expect (page.locator('.error-message')).toContainText("Invalid phone number format")
    
})