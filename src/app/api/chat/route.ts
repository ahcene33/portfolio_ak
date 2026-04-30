import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json(); // {question:string}

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://127.0.0.1:8000';
  const res = await fetch(`${backend}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
