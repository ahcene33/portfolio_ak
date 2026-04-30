import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // A ce stade vous pourriez appeler votre endpoint FastAPI.
    // Pour la démo, on renvoie simplement ce qui a été reçu.
    console.log('Contact form data →', body);

    return NextResponse.json(
      { status: 'success', message: 'Message received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error →', error);
    return NextResponse.json(
      { status: 'error', message: 'Invalid request' },
      { status: 400 }
    );
  }
}
