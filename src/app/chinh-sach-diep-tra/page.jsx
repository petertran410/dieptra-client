// src/app/chinh-sach-diep-tra/page.js
import { getMetadata } from '../../utils/helper-server';
import PolicyPageLayout from './_components/policy-page-layout';

export const metadata = getMetadata({
  title: 'Chính Sách Diệp Trà',
  description: 'Tìm hiểu về các chính sách bảo mật, mua hàng, thanh toán, giao hàng và các quy định khác của Diệp Trà.'
});

const PolicyMainPage = () => {
  return <PolicyPageLayout currentSlug="chinh-sach-diep-tra" />;
};

export default PolicyMainPage;
