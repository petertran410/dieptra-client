import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// Revalidate theo yêu cầu: CMS/backend gọi sau khi đổi danh mục/sản phẩm
// để xả cache route ngay, không phải chờ revalidate theo thời gian (300-600s).
// Bảo vệ bằng secret (NEXT_API_KEY) để chỉ hệ thống nội bộ gọi được.
export async function POST(request) {
  const secret = process.env.NEXT_API_KEY;
  const provided =
    request.headers.get('x-revalidate-secret') ||
    new URL(request.url).searchParams.get('secret');

  if (!secret || provided !== secret) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  // Xả toàn bộ route (layout-level) → mọi trang lấy data mới ở request kế tiếp.
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
