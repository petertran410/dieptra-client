import { getMetadata } from '../../utils/helper-server';
import HomeTheme from '../(home)/_components/home-theme';
import AboutUs from './_components/about-us';
import Ecosystem from './_components/ecosystem';
import Strength from './_components/strength';
import Process from './_components/process';
import Culture from './_components/culture';
import Faq from './_components/faq';
import HomeContact from './_components/contact';
import StickyCta from './_components/sticky-cta';
import RevealSection from './_components/reveal-section';

export const metadata = getMetadata({
  title: 'Giới Thiệu Diệp Trà | Hành Trình Đồng Hành Cùng Quán FnB',
  description:
    'Diệp Trà chia sẻ hành trình phát triển thương hiệu, định hướng sản phẩm và kinh nghiệm đồng hành cùng quán F&B trong lựa chọn nguyên liệu, xây dựng menu và vận hành đồ uống.',
  url: `${process.env.NEXT_PUBLIC_DOMAIN}/gioi-thieu-diep-tra`
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.dieptra.com/#organization",
      "name": "Diệp Trà",
      "url": "https://www.dieptra.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dieptra.com/images/logo-black.webp"
      },
      "description": "Diệp Trà là thương hiệu cung cấp và phân phối nguyên liệu pha chế cho quán F&B, đồng hành cùng khách hàng trong lựa chọn sản phẩm, xây dựng menu và vận hành đồ uống.",
      "founder": {
        "@id": "https://www.dieptra.com/tac-gia/le-thi-hoang-anh#person"
      },
      "sameAs": [
        "https://www.dieptra.com/",
        "https://www.facebook.com/dieptra.0788339379",
        "https://www.tiktok.com/@dieptra_official",
        "https://www.youtube.com/@Dieptra_Official"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.dieptra.com/tac-gia/le-thi-hoang-anh#person",
      "name": "Lê Thị Hoàng Anh",
      "url": "https://www.dieptra.com/tac-gia/le-thi-hoang-anh",
      "jobTitle": "Founder Diệp Trà",
      "worksFor": {
        "@id": "https://www.dieptra.com/#organization"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dieptra.com/#website",
      "url": "https://www.dieptra.com/",
      "name": "Diệp Trà",
      "publisher": {
        "@id": "https://www.dieptra.com/#organization"
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.dieptra.com/gioi-thieu-diep-tra#webpage",
      "url": "https://www.dieptra.com/gioi-thieu-diep-tra",
      "name": "Giới Thiệu Diệp Trà | Hành Trình Đồng Hành Cùng Quán FnB",
      "description": "Diệp Trà chia sẻ hành trình phát triển thương hiệu, định hướng sản phẩm và kinh nghiệm đồng hành cùng quán F&B trong lựa chọn nguyên liệu, xây dựng menu và vận hành đồ uống.",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.dieptra.com/assets/images/nhung-con-so-dang-tu-hao-cua-diep-tra-60-tinh-thanh-100-thuong-hieu-lon.webp",
        "width": 1200,
        "height": 828
      },
      "image": "https://www.dieptra.com/assets/images/nhung-con-so-dang-tu-hao-cua-diep-tra-60-tinh-thanh-100-thuong-hieu-lon.webp",
      "isPartOf": {
        "@id": "https://www.dieptra.com/#website"
      },
      "about": {
        "@id": "https://www.dieptra.com/#organization"
      },
      "mainEntity": {
        "@id": "https://www.dieptra.com/#organization"
      },
      "breadcrumb": {
        "@id": "https://www.dieptra.com/gioi-thieu-diep-tra#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.dieptra.com/gioi-thieu-diep-tra#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://www.dieptra.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Giới thiệu Diệp Trà",
          "item": "https://www.dieptra.com/gioi-thieu-diep-tra"
        }
      ]
    }
  ]
};

const IntroPage = () => {
  return (
    <HomeTheme>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* Hero – no animation, visible immediately */}
      <AboutUs />

      {/* Ecosystem – fade up from bottom, repeats on every scroll */}
      <RevealSection delay={0} from="bottom" threshold={0.05}>
        <Ecosystem />
      </RevealSection>

      {/* Strength – fade up, triggers slightly earlier */}
      <RevealSection delay={0} from="bottom" threshold={0.06}>
        <Strength />
      </RevealSection>

      {/* Process / Timeline – slide in from bottom */}
      <RevealSection delay={0} from="bottom" threshold={0.04}>
        <Process />
      </RevealSection>

      {/* Culture – slide in from left for directional variety */}
      <RevealSection delay={0} from="left" threshold={0.05}>
        <Culture />
      </RevealSection>

      {/* FAQ – slide in from right for contrast */}
      <RevealSection delay={0} from="right" threshold={0.05}>
        <Faq />
      </RevealSection>

      {/* Contact – fade up last */}
      <RevealSection delay={0} from="bottom" threshold={0.05}>
        <HomeContact />
      </RevealSection>

      <StickyCta />
    </HomeTheme>
  );
};

export default IntroPage;
