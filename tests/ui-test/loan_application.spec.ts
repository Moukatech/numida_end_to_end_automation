import {test, expect} from '@playwright/test'
import {Loan} from './page_objects/loan_application'
import { Login } from './page_objects/login'
import { generateCustomerData,phone_number } from '../../test_data/customer_data'

const data = await generateCustomerData()

test.beforeEach(async ({page}) => {
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login(phone_number.toString(), "0000")
    
})

test('verify user can fill personal details for  loan application', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"",data.DOB)
    

})

test('verify user can fill loan details successfully', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"",data.DOB)
    await loans_page.get_loan_details("10000","testin", '15')
    

})

test('verify correct error when loan amount is less than 1000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"",data.DOB)
    await loans_page.get_loan_details("100","testing", '15')
    await expect (page.locator('.field-error')).toContainText("Loan amount must be at least 1000")

})

test('verify correct error when loan amount is more than 5000000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"",data.DOB)
    await loans_page.get_loan_details("10000000","testing", '15')
    await expect (page.locator('.field-error')).toContainText("Loan amount cannot exceed 5000000")
    

})

test('verify correct loan status(PENDING) is displayed when loan amount is more than 1,000,000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"",data.DOB)
    await loans_page.get_loan_details("1000000","testing", '15')
    await expect (page.locator('.status-badge')).toContainText("PENDING")
    await new Promise(resolve => setTimeout(resolve, 4000))

})

test('verify correct loan status(PENDING) is displayed when the age is more than 60', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.fullname,data.national_ID,"","1960-01-01")
    await loans_page.get_loan_details("10000","testing", '15')
    await expect (page.locator('.status-badge')).toContainText("PENDING")
    await new Promise(resolve => setTimeout(resolve, 4000))

})

