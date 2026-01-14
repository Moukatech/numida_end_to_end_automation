import {faker} from "@faker-js/faker"

const random_Phone_Number = Math.floor(Math.random()*90000000 + 10000000)
export const  phone_number="254"+random_Phone_Number

const fakeDOB= faker.date.birthdate()
const formattedDOB = fakeDOB.toISOString().split('T')[0]


const getFaker = async () => {
  const { faker } = await import('@faker-js/faker');
  // You can now use faker here, e.g., to generate data in a function
  return faker;
};


export async function generateCustomerData() {
  const faker = await getFaker();
  return {
    full_name:faker.person.fullName(),
    national_id:"ID" + random_Phone_Number,
    date_of_birth:formattedDOB,
    loan_amount: 50000,
    loan_term: 15,
    purpose: 'Business expansion'
  };
}

export const validPhone = '+256700000000';
export const validOtp = '0000';

export const validApplication = {
  full_name: 'John Doe',
  national_id: 'CM12345678',
  email: 'john@example.com',
  date_of_birth: '1990-01-01',
  loan_amount: 50000,
  loan_term: 12,
  purpose: 'Business expansion'
};