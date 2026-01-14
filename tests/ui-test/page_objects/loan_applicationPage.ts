import {Page,expect} from '@playwright/test'

export class Loan{
    readonly page:Page
    readonly full_Name_textbox
    readonly national_ID_textbox
    readonly email_textbox
    readonly DOB_datepicker
    readonly loan_amount_textbox
    readonly loan_term_dropdown
    readonly next_Btn
    readonly purpose_textbox
    readonly Submit_application_Btn

constructor(page:Page){
    this.page =page
    this.full_Name_textbox = page.locator('#fullName')
    this.national_ID_textbox = page.locator('#nationalId')
    this.email_textbox = page.locator('#email')
    this.DOB_datepicker= page.locator('#dob')
    this.next_Btn = page.getByRole('button', {name:"Next"})
    this.loan_amount_textbox= page.locator('#loanAmount')
    this.loan_term_dropdown= page.locator('#loanTerm')
    this.purpose_textbox=page.locator('#purpose')
    this.Submit_application_Btn = page.getByRole('button', {name:"Submit Application"})
}

async get_personal_details(fullname:string, national_ID:string, email:string, date_of_birth:string){
    await this.full_Name_textbox.fill(fullname)
    await this.national_ID_textbox.fill(national_ID)
    await this.email_textbox.fill(email)
    await this.DOB_datepicker.fill(date_of_birth)
    await this.next_Btn.click()
}

async get_loan_details(loan_amount:string,purpose:string, loan_term:string){
    await this.loan_amount_textbox.fill(loan_amount)
    await this.loan_term_dropdown.selectOption(loan_term)
    await this.purpose_textbox.fill(purpose)
    await this.Submit_application_Btn.click()
}

}