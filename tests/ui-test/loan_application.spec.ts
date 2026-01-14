import {test, expect} from '@playwright/test'
import {Loan} from './page_objects/loan_applicationPage'
import { Login } from './page_objects/loginPage'
import { generateCustomerData } from '../../test_data/customer_data'

let data:any

test.beforeEach(async ({page}) => {
    data = await generateCustomerData()
    
    const  phone_number="254"+ Math.floor(Math.random()*90000000 + 10000000)
    const login_page = new Login(page)
    await login_page.start_application()
    await login_page.login(phone_number.toString(), "0000")
    
})

test.describe("Test loan Application", async () => {

test('verify user can fill personal details for  loan application', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",data.date_of_birth)
    
    

})

test('verify user can request for a loan successfully by filling loan details', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",data.date_of_birth)
    await loans_page.get_loan_details("10000","testin", '15')
    await expect (page.locator('.status-badge')).toContainText("APPROVED")
    
    

})
test('verify correct loan status(PENDING) is displayed when loan amount is more than 1,000,000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",data.date_of_birth)
    await loans_page.get_loan_details("1000000","testing", '15')
    await expect (page.locator('.status-badge')).toContainText("PENDING")
    // await new Promise(resolve => setTimeout(resolve, 4000))

})


test('verify correct loan status(PENDING) is displayed when the age is more than 60', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"","1960-01-01")
    await loans_page.get_loan_details("10000","testing", '15')
    await expect (page.locator('.status-badge')).toContainText("PENDING")
    // await new Promise(resolve => setTimeout(resolve, 4000))

})
})

test.describe("Negative tests for the loan application flow", async () => {

test('verify correct error when loan amount is more than 5000000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",data.date_of_birth)
    await loans_page.get_loan_details("10000000","testing", '15')
    await expect (page.locator('.field-error')).toContainText("Loan amount cannot exceed 5000000")
    

})

test('verify correct error is displayed when loan amount is less than 1000', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",data.date_of_birth)
    await loans_page.get_loan_details("100","testing", '15')
    await expect (page.locator('.field-error')).toContainText("Loan amount must be at least 1000")
    await new Promise(resolve => setTimeout(resolve, 4000))

})

test('verify correct error is displayed when the applicant is below 18', async({page})=>{
    const loans_page= new Loan(page)
    await loans_page.get_personal_details(data.full_name,data.national_id,"",'2020-01-01')
    await loans_page.get_loan_details("1000","testing", '15')
    await expect (page.locator('.field-error')).toContainText("Must be at least 18 years old")
    await new Promise(resolve => setTimeout(resolve, 4000))
   
})

})