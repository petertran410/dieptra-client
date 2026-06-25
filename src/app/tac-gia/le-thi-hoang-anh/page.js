import { getMetadata } from '../../../utils/helper-server';
import AuthorContent from './_components/author-content';

export const metadata = getMetadata({
  title: 'Tác Giả Diệp Trà | Tư Vấn Nguyên Liệu, Công Thức & Menu',
  description:
    'Tìm hiểu về tác giả Diệp Trà với các nội dung chuyên sâu về nguyên liệu pha chế, công thức đồ uống, xây dựng menu và kinh nghiệm vận hành quán từ thực tế triển khai.',
  url: '/tac-gia/le-thi-hoang-anh'
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lê Thị Hoàng Anh',
  jobTitle: 'Founder Diệp Trà',
  description:
    'Lê Thị Hoàng Anh là Founder Diệp Trà, chuyên nghiên cứu nguyên liệu pha chế, phát triển công thức đồ uống và tư vấn xây dựng menu cho các mô hình trà sữa, cà phê và F&B.',
  image: 'https://www.dieptra.com/images/home-v2/author-avatar.webp',
  url: 'https://www.dieptra.com/tac-gia/le-thi-hoang-anh',
  worksFor: { '@type': 'Organization', name: 'Diệp Trà', url: 'https://www.dieptra.com/' },
  knowsAbout: [
    'Nguyên liệu pha chế',
    'Tư vấn menu đồ uống',
    'Trà sữa',
    'Topping pha chế',
    'Mứt trái cây',
    'Vận hành thương hiệu F&B'
  ],
  sameAs: [
    'https://www.facebook.com/dieptra.0788339379',
    'https://www.tiktok.com/@founder.dieptra',
    'https://www.youtube.com/@Dieptra_Official'
  ]
};

export default function AuthorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <AuthorContent />
    </>
  );
}
