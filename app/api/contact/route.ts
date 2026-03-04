import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 2. Send the email
    const { data, error } = await resend.emails.send({
      from: 'KNORX Technologies <onboarding@resend.dev>', // Resend's default test sender
      to: ['sixtus.ikpali@gmail.com'], // CHANGE THIS to your actual company email address
      subject: `New Inquiry from ${name}`,
      replyTo: email, // This lets you click "Reply" in your inbox to email the user back
      html: `
        <h2>New Message from KNORX Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}