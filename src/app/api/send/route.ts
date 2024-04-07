
import { Resend } from 'resend';
import { EmailTemplate } from '~/app/_components/email-template';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
  const { email } = await request.json();
  try {
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
