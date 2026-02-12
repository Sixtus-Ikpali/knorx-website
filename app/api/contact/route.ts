

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_SDXmoDRG_HepuCuqMina1tuhvJxEovTex');

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'KNORX Contact <onboarding@resend.dev>', // Resend provides this for testing
      to: 'sixtus.projects@gmail.com', // PUT ACTUAL EMAIL WHEN READY
      subject: `New Lead: ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}