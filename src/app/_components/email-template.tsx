import Link from 'next/link';
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  token: string;
  otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  token,
   otp
}) => (
  <div>
    <h2>{`Hi ${name},`}</h2>

    <h3>Thank you for signing-up with ECOMMERCE, use the OTP below to verify your email.</h3>

    <h2>{otp}</h2>

    <a href={`https://roc8-ecomm.vercel.app/verify-otp/${token}`} target='_blank'>Click here to verify your email</a>
  </div>
);
