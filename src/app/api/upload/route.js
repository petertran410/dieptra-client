import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const backendFormData = new FormData();
    backendFormData.append('file', new Blob([fileBuffer], { type: file.type }), file.name);

    const backendUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/file/upload`;

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'X-Force-Signature': process.env.NEXT_API_KEY,
        'X-Site-Code': 'dieptra'
      },
      body: backendFormData
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      return NextResponse.json(
        { error: `Backend failed: ${backendResponse.status}` },
        { status: backendResponse.status }
      );
    }

    const result = await backendResponse.text();
    return new NextResponse(result, { status: 200 });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
  }
}
