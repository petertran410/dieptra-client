'use client';

import Carousel from '../../../components/carousel';
import SectionBlock from '../../../components/section-block';
import { PX_ALL } from '../../../utils/const';
import { Box, Flex } from '@chakra-ui/react';
import ContactItem from './contact-item';

const ContactHN = () => {
  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const CONTACT_LIST = [
    {
      fullName: 'Mrs. Phí Phương Thanh',
      image: '/images/contact-user-1.webp',
      position: 'Trưởng phòng Kinh doanh 01',
      phone: '+84 788 339 379',
      email: 'thanhptp@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Linh Thu Trang',
      image: '/images/contact-user-2.webp',
      position: 'Nhân viên Kinh doanh',
      phone: '+84 343 393 799',
      email: 'tranglt@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Mai Vân Anh',
      image: '/images/contact-user-3.webp',
      position: 'Nhân viên Kinh doanh',
      phone: '+84 973 123 230',
      email: 'anhmtv@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mr. Lê Xuân Tùng',
      image: '/images/contact-user-4.webp',
      position: 'Nhân viên Kinh doanh',
      phone: '+84 788 339 379',
      email: 'tunglx@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Tạ Thị Trang',
      image: '/images/contact-user-5.webp',
      position: 'Sale Admin',
      phone: '+84 788 339 379',
      email: 'trangtt@hisweetievietnam.com.vn'
    }
  ];

  return (
    <Flex direction="column" align="center" px={PX_ALL} pos="relative" zIndex={5}>
      <SectionBlock title="phòng kinh doanh hà nội" />

      <Box mt="24px" display={{ xs: 'none', lg: 'block' }} w="105%">
        <Carousel spaceBetween={24} breakpoints={breakpoints} autoplay={false}>
          {CONTACT_LIST.map((item, index) => {
            return <ContactItem key={index} item={item} />;
          })}
        </Carousel>
      </Box>

      <Flex mt="24px" display={{ xs: 'flex', lg: 'none' }} direction="column" gap="16px">
        {CONTACT_LIST.map((item, index) => {
          return <ContactItem key={index} item={item} />;
        })}
      </Flex>
    </Flex>
  );
};

export default ContactHN;
