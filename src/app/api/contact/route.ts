import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, phone, countryCode, honeypot } = body;

    // 1. Honeypot check for bots
    if (honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    // 2. Server-side validation
    if (!name || !email || !subject || !phone || !countryCode) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Phone format validation (strictly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: 'Phone number must be exactly 10 digits' }, { status: 400 });
    }

    // 3. Environment Variable Check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json(
        { error: 'Email service is not configured. Please add RESEND_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'kumarabhay46790@gmail.com';
    const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // 4. Sanitize inputs
    const sanitize = (str: string) => str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m] || m));

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message || 'No message provided');
    const safePhone = sanitize(phone);
    const safeCountryCode = sanitize(countryCode);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 5. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Inquiry: ${safeSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff; color: #333333;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #666666;">Full Name:</strong>
            <p style="margin: 5px 0 0 0; font-size: 16px;">${safeName}</p>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #666666;">Email Address:</strong>
            <p style="margin: 5px 0 0 0; font-size: 16px;">${safeEmail}</p>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #666666;">Phone Number:</strong>
            <p style="margin: 5px 0 0 0; font-size: 16px;">${safeCountryCode} ${safePhone}</p>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #666666;">Subject:</strong>
            <p style="margin: 5px 0 0 0; font-size: 16px;">${safeSubject}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 25px; border-left: 4px solid #3b82f6;">
            <strong style="display: block; margin-bottom: 10px; color: #666666;">Message:</strong>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #374151; margin: 0;">${safeMessage}</p>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            Submitted on: ${timestamp} (IST)
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
