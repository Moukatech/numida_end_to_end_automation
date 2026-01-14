import {test, expect} from '@playwright/test'

import { Login } from './page_objects/login'

test('start application successfully', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()

})

test ('verify first time user can log in successfully', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login("0728494555", "0000")
    await expect(page.locator('//*[@id="root"]/div/div/h2')).toContainText("Personal Details")
    await new Promise(resolve => setTimeout(resolve, 4000))
})

test ('verify correct error is displayed when using an invalid otp', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login("0728494555", "8800")
    await expect (page.locator('.error-message')).toContainText("Invalid OTP")
    await new Promise(resolve => setTimeout(resolve, 4000))
})

test ('verify correct error is displayed when using invalid phone number', async({page})=>{
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.enter_phone_number("0728494555")
    await expect (page.locator('.error-message')).toContainText("Invalid phone number format")
    await new Promise(resolve => setTimeout(resolve, 4000))
})