/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Resend } from 'resend';
import { EmailTemplate } from '~/app/_components/email-template';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);


export async function POST(request) {
  const { email } = await request.json();
  try {
    // @ts-ignore
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'Abhi' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
