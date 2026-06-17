import { getMetadata } from '../../utils/helper-server';
import { serverFetchJSON } from '../../utils/server-fetch';
import HomeTheme from './_components/home-theme';
import Hero from './_components/hero/hero';
import UspStats from './_components/usp-stats';
import Categories from './_components/categories';
import SplitTradeBrand from './_components/split-trade-brand';
import FeaturedProductsHome from './_components/featured-products-home';
import Feedback from './_components/feedback';
import LermaoBanner from './_components/lermao-banner';
import GuideCards from './_components/guide-cards';
import WhyFaq from './_components/why-faq';

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
    <HomeTheme>
      <Hero />
      <UspStats />
      <Categories />
      <SplitTradeBrand />
      <FeaturedProductsHome data={featuredProducts || []} />
      <Feedback />
      <LermaoBanner />
      <GuideCards />
      <WhyFaq />
    </HomeTheme>
  );
}
