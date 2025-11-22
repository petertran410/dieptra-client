import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const backendFormData = new FormData();
    backendFormData.append('file', new Blob([fileBuffer], { type: 'application/pdf' }), file.name);

    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/file/upload`, {
      method: 'POST',
      headers: {
        'X-Force-Signature': process.env.NEXT_API_KEY
      },
      body: backendFormData
    });

    const backendData = await backendResponse.text();

    if (!backendResponse.ok) {
      return NextResponse.json({ error: backendData.message || 'Upload failed' }, { status: backendResponse.status });
    }

    return new NextResponse(backendData, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
