
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // HERE: You would normally connect this to an email service 
    // like Resend, SendGrid, or AWS SES to actually email yourself.
    
    // For now, we will log it to the server console so you can see it works.
    console.log("Contact Form Submission:", data);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}