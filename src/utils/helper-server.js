import { Text } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';

const fontMontserrat = Montserrat({ subsets: ['latin', 'vietnamese'] });

export const convertSlugURL = (text) => {
  if (!text) {
    return '';
  }
  let slug = text.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/ /gi, '-');
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  slug = slug.replace(/\\/gi, '-');
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

export const formatCurrency = (price = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));

export const convertTimestamp = (timestamp) => {
  if (!timestamp) return '';

  try {
    let date;

    if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      date = timestamp > 1000000000000 ? new Date(timestamp) : new Date(timestamp * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      console.warn('Unknown timestamp format:', timestamp);
      return '';
    }

    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', timestamp);
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error converting timestamp:', error, 'Input:', timestamp);
    return '';
  }
};

export const getCategoryName = (name) => {
  const words = name.split(' ') || [];

  if (words.length > 2) {
    const [firstWord, ...restWord] = words;

    return (
      <Text className={fontMontserrat.className} fontSize={24} fontWeight={600} color="#EA4335" lineHeight="29px">
        {firstWord}
        <br />
        {restWord.join(' ')}
      </Text>
    );
  }

  return (
    <Text className={fontMontserrat.className} fontSize={24} fontWeight={600} color="#3AB3D6" lineHeight="29px">
      {name}
    </Text>
  );
};

const META_TITLE = 'Diệp Trà - Chuyên Cung Cấp Nguyên Liệu Pha Chế Hàng Đầu VN';
export const META_DESCRIPTION =
  'Là thương hiệu thuộc Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam, được ra đời vào năm 2018 dưới tên Diệp Trà, với sứ mệnh tiên phong, đi đầu trong ngành đồ uống tại Việt Nam. Chúng tôi chuyên phục vụ các mặt hàng nguyên liệu pha chế nhập khẩu từ Đài Loan (Trung Quốc) và Trung Quốc, tập trung vào chiến lược "Hợp tác chiến lược toàn diện và độc quyền" với các đối tác uy tín số 1 trên thế giới để mang đến những sản phẩm tốt nhất, xu hướng nhất với giá thành hợp lý đến thị trường Việt Nam.';
const META_IMAGE = '/images/preview.webp';
export const META_KEYWORDS = [
  'Diệp Trà',
  'nguyên liệu pha chế',
  'thương hiệu pha chế hàng đầu',
  'Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam',
  'thương hiệu pha chế Việt Nam',
  'nguyên liệu pha chế Đài Loan',
  'nguyên liệu pha chế Trung Quốc',
  'đồ uống Việt Nam',
  'sản phẩm pha chế nhập khẩu',
  'hợp tác chiến lược độc quyền',
  'đối tác uy tín',
  'sản phẩm xu hướng',
  'giá thành hợp lý',
  'thương hiệu đồ uống'
];

// Get the proper base URL for metadata
const getBaseUrl = () => {
  // In production, use the environment variable
  if (process.env.NEXT_PUBLIC_DOMAIN) {
    return process.env.NEXT_PUBLIC_DOMAIN;
  }
};

const META_URL = getBaseUrl();
const META_SITENAME = 'Diệp Trà - Chuyên Cung Cấp Nguyên Liệu Pha Chế Hàng Đầu VN';
const META_TYPE = 'website';

export const getMetadata = (data) => {
  const {
    title = META_TITLE,
    description = META_DESCRIPTION,
    keywords = META_KEYWORDS,
    url = META_URL,
    siteName = META_SITENAME,
    type = META_TYPE
  } = data || {};

  const baseUrl = getBaseUrl();
  const imageUrl = `${baseUrl}${META_IMAGE}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl), // This fixes the metadataBase warning
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ],
      type
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
};
