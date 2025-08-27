import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  if (url.searchParams.has('sortBy')) {
    url.searchParams.delete('sortBy');
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
