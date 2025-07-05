// src/app/chinh-sach-diep-tra/[slug]/page.js
import { API } from '../../../utils/API';
import { getMetadata } from '../../../utils/helper-server';
import PolicyPageLayout from '../_components/policy-page-layout';

// Generate metadata cho từng trang con
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const pageData = await API.request({
      url: `/api/pages/client/by-slug/${slug}`
    });

    return getMetadata({
      title: pageData?.meta_title || pageData?.title,
      description: pageData?.meta_description || `Tìm hiểu về ${pageData?.title} tại Diệp Trà.`
    });
  } catch (error) {
    return getMetadata({
      title: 'Trang không tìm thấy',
      description: 'Trang bạn đang tìm kiếm không tồn tại.'
    });
  }
}

const PolicySubPage = ({ params }) => {
  const { slug } = params;

  return <PolicyPageLayout currentSlug={slug} />;
};

export default PolicySubPage;
