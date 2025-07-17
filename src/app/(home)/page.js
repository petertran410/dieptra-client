import AboutUs from './_components/about-us';
import HomeContact from './_components/contact';
import Feedback from './_components/feedback';
import HomeIntro from './_components/intro/intro';
import TopProduct from './_components/top-product/top-product';
import { getMetadata } from '../../utils/helper-server';
import Statistic from '../gioi-thieu-diep-tra/_components/statistic';
import FeaturedArticle from './_components/feature-article';

export const metadata = getMetadata({
  title: 'Diệp Trà | Chuyên Cung Cấp Nguyên Liệu Pha Chế',
  description:
    'Diệp Trà là thương hiệu chuyên cung cấp nguyên liệu pha chế hàng đầu tại Việt Nam. Sản phẩm đa dạng, chất lượng cao, giá tốt, được nhiều đối tác tin dùng. Có hơn 30.000 đối tác toàn quốc'
});

export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <HomeIntro />
      <AboutUs />
      <TopProduct />
      {/* <VideoList /> */}
      <Statistic />
      <Feedback />
      <FeaturedArticle />
      <HomeContact />
    </div>
  );
}
