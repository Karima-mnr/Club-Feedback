import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, website } = body ?? {};

    // Honeypot: bots fill this hidden field. Pretend success, store nothing.
    if (website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please write at least 3 characters.' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long (max 2000 characters).' },
        { status: 400 }
      );
    }

    await connectDB();
    await Feedback.create({ message: message.trim() });

    return NextResponse.json(
      { success: true, message: 'Thank you — your feedback was received.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('[feedback] POST error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}