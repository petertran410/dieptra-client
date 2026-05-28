import { getMetadata } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import ProductListPage from '../_components/product-list-page';

export const revalidate = 300;

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
  const target = await findCategoryBySlugPath(params.categorySlug);
  if (!target) {
    return getMetadata({ title: 'Danh Mục Sản Phẩm' });
  }
  return getMetadata({
    title: target.title_meta || target.name,
    description: target.description || 'Khám phá nguyên liệu pha chế chất lượng cao từ Diệp Trà'
  });
}

export default async function CategoryProductsPage({ params, searchParams }) {
  return <ProductListPage slugPath={params.categorySlug || []} searchParams={searchParams || {}} />;
}
