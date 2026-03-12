
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, company, email, service, message } = await request.json();

    // Validation - only required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'KNORX Technologies <onboarding@resend.dev>',
      to: ['hello@knorx.tech'],
      subject: `New Inquiry from ${name}${company ? ` · ${company}` : ''}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <div style="background: #0b1c31; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #4a9cc8; margin: 0; font-size: 22px; letter-spacing: 2px;">KNORX TECHNOLOGIES</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 6px 0 0; font-size: 13px;">New website inquiry</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; width: 140px;">
                <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px;">
                ${name}
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px;">
                ${company}
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px;">
                <a href="mailto:${email}" style="color: #3a7ca5;">${email}</a>
              </td>
            </tr>
            ${service ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px;">
                ${service}
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; vertical-align: top;">
                <strong style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
              </td>
              <td style="padding: 12px 0; color: #111827; font-size: 15px; line-height: 1.7;">
                ${message.replace(/\n/g, '<br/>')}
              </td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3a7ca5;">
            <p style="margin: 0; color: #1e40af; font-size: 13px;">
              Hit <strong>Reply</strong> to respond directly to ${name} at ${email}
            </p>
          </div>

          <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
            Sent from knorx.tech contact form
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (err: unknown) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}