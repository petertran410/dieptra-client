import AboutUs from './_components/about-us';
import HomeContact from './_components/contact';
import Feedback from './_components/feedback';
import HomeIntro from './_components/intro/intro';
import TopProduct from './_components/top-product/top-product';

export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <HomeIntro />
      <AboutUs />
      <TopProduct />
      <Feedback />
      <HomeContact />
    </div>
  );
}
