/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');

// Function to hash a password
const saltRounds = 10;

export const hashPassword = async (password: string) : Promise<string>  =>{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return await bcrypt.hash(password, saltRounds) as Promise<string>;
}

// Function to compare a plain text password with a hashed password
export const comparePasswords = async (plainPassword: string, hashedPassword: string) : Promise<boolean>  => {
  return await bcrypt.compare(plainPassword, hashedPassword) as Promise<boolean>;
}

export const generateOtp = (): string => {
  return otpGenerator.generate(8, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }) as string;
}