import Breadcrumb from '../../../components/breadcrumb';
import TableOfContents from '../../../components/toc';
import { API } from '../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { META_DESCRIPTION } from '../../../utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/${id}`);
  const data = await response.json();

  const { title: titleData, imagesUrl } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
  const title = `${titleData}`;
  const description = META_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl]
    }
  };
}

const CultureDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const newsDetail = await API.request({ url: `/api/news/client/${id}` });

  if (!newsDetail) {
    return null;
  }

  const { title, htmlContent, imagesUrl } = newsDetail;

  return (
    <Box>
      <Flex
        px={PX_ALL}
        pt={{ xs: '70px', lg: '162px' }}
        gap={{ xs: '50px', lg: '24px' }}
        pb="50px"
        direction={{ xs: 'column', lg: 'row' }}
      >
        <Flex w="full" direction="column">
          <Breadcrumb
            data={[
              { title: 'Tuyển dụng', href: '/tuyen-dung' },
              { title: 'Bài viết', href: `/bai-viet/${slug}`, isActive: true }
            ]}
          />

          <Text as="h1" fontSize={24} fontWeight={600} mt="20px" lineHeight="30px">
            {title}
          </Text>

          {!!htmlContent?.startsWith('<toc></toc>') && (
            <Box my="24px" className="html-content" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
              <Text fontWeight={700} fontSize={18}>
                Mục lục
              </Text>
              <TableOfContents html={htmlContent} />
            </Box>
          )}

          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image
              src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/culture-banner.webp'}
              w="full"
              h="full"
              alt={IMG_ALT}
            />
          </AspectRatio>

          <Box mt={{ xs: '24px', lg: '48px' }}>
            <Box
              fontSize={18}
              lineHeight="20px"
              className="html-content html-content-16px"
              dangerouslySetInnerHTML={{
                __html: htmlContent
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CultureDetail;
