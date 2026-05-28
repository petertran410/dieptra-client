import AboutUs from './_components/about-us';
import Feedback from './_components/feedback';
import HomeIntro from './_components/intro/intro';
import { getMetadata } from '../../utils/helper-server';
import { serverFetchJSON } from '../../utils/server-fetch';
import Statistic from '../gioi-thieu-diep-tra/_components/statistic';
import FeaturedArticle from './_components/feature-article';
import FeaturedProductsHome from './_components/featured-products-home';

export const metadata = getMetadata({
  title: 'Diệp Trà | Chuyên Cung Cấp Nguyên Liệu Pha Chế',
  description:
    'Diệp Trà là thương hiệu chuyên cung cấp nguyên liệu pha chế hàng đầu tại Việt Nam. Sản phẩm đa dạng, chất lượng cao, giá tốt, được nhiều đối tác tin dùng. Có hơn 30.000 đối tác toàn quốc'
});

export const revalidate = 300;

async function safeFetch(path) {
  try {
    return await serverFetchJSON(path, { next: { revalidate: 300 } });
  } catch {
    return null;
  }
}

export default async function Home() {
  const featuredProducts = await safeFetch('/api/product/client/featured-by-categories');

  return (
    <div>
      <HomeIntro />
      <AboutUs />
      <Statistic />
      <FeaturedProductsHome data={featuredProducts || []} />
      <Feedback />
      <FeaturedArticle />
    </div>
  );
}
