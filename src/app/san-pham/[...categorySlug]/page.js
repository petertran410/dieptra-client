import { notFound } from 'next/navigation';
import { getMetadata } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import ProductListPage from '../_components/product-list-page';

export const revalidate = 300;

function parseSegments(segments = []) {
  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    const second = segments[segments.length - 2];
    if (second === 'page' && /^\d+$/.test(last)) {
      const page = parseInt(last, 10);
      if (page < 1) return null;
      return { slugPath: segments.slice(0, -2), page };
    }
  }
  return { slugPath: segments, page: 1 };
}

async function findCategoryBySlugPath(slugPath = []) {
  if (!slugPath.length) return null;
  try {
    const data = await serverFetchJSON('/api/category/for-cms', { next: { revalidate: 600 } });
    const all = data?.data || [];
    const buildPath = (id) => {
      const c = all.find((x) => x.id === id);
      if (!c) return '';
      if (!c.parent_id) return c.slug;
      return `${buildPath(c.parent_id)}/${c.slug}`;
    };
    const target = slugPath.join('/');
    return all.find((c) => buildPath(c.id) === target) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const parsed = parseSegments(params.categorySlug || []);
  if (!parsed) return getMetadata({ title: 'Danh Mục Sản Phẩm' });

  const { slugPath } = parsed;
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  const canonicalUrl = slugPath.length ? `${baseUrl}/san-pham/${slugPath.join('/')}` : `${baseUrl}/san-pham`;

  if (!slugPath.length) {
    return getMetadata({
      title: 'Sản Phẩm Diệp Trà',
      description: 'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà.',
      url: canonicalUrl
    });
  }

  const target = await findCategoryBySlugPath(slugPath);
  if (!target) {
    return getMetadata({ title: 'Danh Mục Sản Phẩm', url: canonicalUrl });
  }
  return getMetadata({
    title: target.title_meta || target.name,
    description: target.description || 'Khám phá nguyên liệu pha chế chất lượng cao từ Diệp Trà',
    url: canonicalUrl
  });
}

export default async function CategoryProductsPage({ params, searchParams }) {
  const parsed = parseSegments(params.categorySlug || []);
  if (!parsed) notFound();

  return <ProductListPage slugPath={parsed.slugPath} pageNumber={parsed.page} searchParams={searchParams || {}} />;
}
