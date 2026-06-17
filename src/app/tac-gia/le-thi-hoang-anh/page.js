import { getMetadata } from '../../../utils/helper-server';
import AuthorContent from './_components/author-content';

export const metadata = getMetadata({
  title: 'Giới thiệu tác giả | Diệp Trà',
  description:
    'Giới thiệu tác giả nội dung chuyên môn của Diệp Trà: kinh nghiệm vận hành thương hiệu nguyên liệu pha chế, tư vấn menu, nghiên cứu topping và đồng hành cùng các quán trà sữa.',
  url: '/tac-gia/le-thi-hoang-anh'
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lê Thị Hoàng Anh',
  jobTitle: 'Founder Diệp Trà | Chuyên gia tư vấn nguyên liệu & menu đồ uống',
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
