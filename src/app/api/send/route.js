/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Resend } from 'resend';
import { EmailTemplate } from '~/app/_components/email-template';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

/**
 * @param {{ json: () => PromiseLike<{ email: any; }> | { email: any; }; }} request
 * @param {any} response
 */
export async function POST(request, response) {
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
