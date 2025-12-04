import { getMetadata } from '../../../utils/helper-server';
import { getPolicyPageBySlug } from '../../../utils/policy-data';
import PolicyPageLayout from '../_components/policy-page-layout';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const pageData = await getPolicyPageBySlug(slug);

  if (!pageData) {
    return getMetadata({
      title: 'Trang không tìm thấy',
      description: 'Trang bạn đang tìm kiếm không tồn tại.'
    });
  }

  return getMetadata({
    title: pageData.meta_title || pageData.title,
    description: pageData.meta_description || `Tìm hiểu về ${pageData.title} tại Diệp Trà.`
  });
}

const PolicySubPage = ({ params }) => {
  const { slug } = params;

  return <PolicyPageLayout currentSlug={slug} />;
};

export default PolicySubPage;
