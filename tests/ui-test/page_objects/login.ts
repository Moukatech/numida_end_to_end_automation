import {Page,expect} from '@playwright/test'

export class Login{
    readonly page:Page
    readonly start_application_Btn
    readonly phone_number
    readonly send_OTP_Btn
    readonly opt_field
    readonly verify_otp_Btn

constructor(page:Page){
    this.page =page
    this.start_application_Btn = page.getByRole('button', {name: 'Start Application'})
    this.phone_number = page.locator('#phone')
    this.send_OTP_Btn = page.getByRole('button',{name:'Send OTP'} )
    this.opt_field= page.locator('#otp')
    this.verify_otp_Btn= page.getByRole('button', {name:"Verify"})
}


async start_application(){
    await this.page.goto('http://localhost:5173/')
    await expect(this.page.locator('//*[@id="root"]/div/div/p')).toContainText("Welcome! Let's get you started with your loan application.")
    await this.start_application_Btn.click()
}

async enter_phone_number(phone_number:string){
    await this.phone_number.fill(phone_number)
    await this.send_OTP_Btn.click()
}

async login(phone_number:string, otp:string){
    await this.enter_phone_number(phone_number)
    await this.opt_field.fill(otp)
    await this.verify_otp_Btn.click()

}

}

