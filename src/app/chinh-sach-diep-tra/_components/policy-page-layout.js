'use client';

import { getPolicyPageBySlug, getSidebarItems, getMainPage } from '../../../utils/policy-data';
import { PX_ALL } from '../../../utils/const';
import { Box, Flex, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PolicySidebar from './policy-sidebar';
import PolicyContent from './policy-content';

const PolicyPageLayout = ({ currentSlug }) => {
  const router = useRouter();
  const [mainPageData, setMainPageData] = useState(null);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPageData = () => {
      try {
        setIsLoading(true);
        setError(null);

        const sidebarData = getSidebarItems();
        setSidebarItems(sidebarData);

        const mainPage = getMainPage();
        setMainPageData(mainPage);

        const currentPage = getPolicyPageBySlug(currentSlug);

        if (!currentPage) {
          setError('Trang không tồn tại');
          return;
        }

        setCurrentPageData(currentPage);
      } catch (error) {
        console.error('Error loading page data:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, [currentSlug]);

  const handlePageChange = (slug) => {
    if (slug === 'gioi-thieu-diep-tra') {
      router.push('/gioi-thieu-diep-tra');
    } else if (slug === 'lien-he') {
      router.push('/lien-he');
    } else if (slug === 'san-pham') {
      router.push('/san-pham');
    } else if (slug === 'chinh-sach-diep-tra') {
      if (currentSlug !== 'chinh-sach-diep-tra') {
        router.replace('/chinh-sach-diep-tra');
      }
    } else {
      const currentPath = window.location.pathname;
      const targetPath = `/chinh-sach-diep-tra/${slug}`;

      if (currentPath.startsWith('/chinh-sach-diep-tra') && currentPath !== targetPath) {
        router.replace(targetPath);
      } else {
        router.push(targetPath);
      }
    }
  };

  if (isLoading) {
    return (
      <Flex direction="column" bgColor="#FFF" minH="100vh" align="center" justify="center">
        <Text fontSize="18px" color="gray.600">
          Đang tải...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" bgColor="#FFF" px={PX_ALL} py="80px">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

  return (
    <Flex direction="column" bgColor="#FFF" minH="100vh">
      <Box h={{ xs: '70px', lg: '100px' }} />

      <Flex
        px={PX_ALL}
        py={{ xs: '20px', lg: '40px' }}
        gap={{ xs: '20px', lg: '40px' }}
        direction={{ xs: 'column', lg: 'row' }}
        flex={1}
        maxW="1700px"
        mx="auto"
        w="full"
      >
        <Box w={{ xs: 'full', lg: '350px' }} flexShrink={0}>
          <PolicySidebar
            mainPageData={mainPageData}
            sidebarItems={sidebarItems}
            currentSlug={currentSlug}
            onPageChange={handlePageChange}
          />
        </Box>

        <Box flex={1} minW={0}>
          <PolicyContent pageData={currentPageData} isLoading={false} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default PolicyPageLayout;
