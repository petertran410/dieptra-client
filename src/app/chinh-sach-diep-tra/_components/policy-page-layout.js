// src/app/chinh-sach-diep-tra/_components/policy-page-layout.js
'use client';

import { useQueryPageBySlug, useQueryChildPages } from '../../../services/pages.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { Box, Flex, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PolicySidebar from './policy-sidebar';
import PolicyContent from './policy-content';

const PolicyPageLayout = ({ currentSlug }) => {
  const router = useRouter();
  const [mainPageData, setMainPageData] = useState(null);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [sidebarPages, setSidebarPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: currentPage, isLoading: loadingCurrentPage, error: currentPageError } = useQueryPageBySlug(currentSlug);

  const { data: childPages, isLoading: loadingChildPages } = useQueryChildPages(
    currentSlug === 'chinh-sach-diep-tra' ? null : null
  );

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setIsLoading(true);

        // Nếu đang ở trang chính
        if (currentSlug === 'chinh-sach-diep-tra') {
          setMainPageData(currentPage);
          setCurrentPageData(currentPage);

          // Lấy danh sách trang con cho sidebar
          if (currentPage?.id) {
            const children = await fetch(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/pages/client/children?parentId=${currentPage.id}`
            ).then((res) => res.json());
            setSidebarPages(children || []);
          }
        } else {
          // Nếu đang ở trang con
          setCurrentPageData(currentPage);

          // Lấy thông tin trang cha và danh sách trang con cho sidebar
          if (currentPage?.parent_id) {
            const [parentData, siblingPages] = await Promise.all([
              fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/pages/admin/${currentPage.parent_id}`).then((res) =>
                res.json()
              ),
              fetch(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/pages/client/children?parentId=${currentPage.parent_id}`
              ).then((res) => res.json())
            ]);

            setMainPageData(parentData);
            setSidebarPages(siblingPages || []);
          }
        }
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentPage) {
      loadPageData();
    }
  }, [currentPage, currentSlug]);

  // Handle navigation
  const handlePageChange = (slug) => {
    if (slug === 'gioi-thieu-diep-tra') {
      router.push('/gioi-thieu-diep-tra');
    } else if (slug === 'lien-he') {
      router.push('/lien-he');
    } else if (slug === 'san-pham') {
      router.push('/san-pham');
    } else if (slug === 'chinh-sach-diep-tra') {
      router.push('/chinh-sach-diep-tra');
    } else {
      router.push(`/chinh-sach-diep-tra/${slug}`);
    }
  };

  // Loading state
  if (isLoading || loadingCurrentPage) {
    return (
      <Flex direction="column" bgColor="#FFF" minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="main.1" />
        <Text mt={4}>Đang tải...</Text>
      </Flex>
    );
  }

  // Error state
  if (currentPageError) {
    return (
      <Flex direction="column" bgColor="#FFF" px={PX_ALL} py="80px">
        <Alert status="error">
          <AlertIcon />
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </Alert>
      </Flex>
    );
  }

  // Main render
  return (
    <Flex direction="column" bgColor="#FFF" minH="100vh">
      {/* Header space */}
      <Box h={{ xs: '70px', lg: '100px' }} />

      {/* Main content */}
      <Flex
        px={PX_ALL}
        py={{ xs: '20px', lg: '40px' }}
        gap={{ xs: '20px', lg: '40px' }}
        direction={{ xs: 'column', lg: 'row' }}
        flex={1}
        maxW="1400px"
        mx="auto"
        w="full"
      >
        {/* Sidebar */}
        <Box w={{ xs: 'full', lg: '300px' }} flexShrink={0}>
          <PolicySidebar
            mainPageData={mainPageData}
            sidebarPages={sidebarPages}
            currentSlug={currentSlug}
            onPageChange={handlePageChange}
          />
        </Box>

        {/* Content */}
        <Box flex={1} minW={0}>
          <PolicyContent pageData={currentPageData} isLoading={isLoading} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default PolicyPageLayout;
