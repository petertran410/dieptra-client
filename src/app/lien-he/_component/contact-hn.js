'use client';

import Carousel from '../../../components/carousel';
import SectionBlock from '../../../components/section-block';
import { PX_ALL } from '../../../utils/const';
import { Box, Flex } from '@chakra-ui/react';
import ContactItem from './contact-item';
import { useTranslation } from '../../../hooks/useTranslation';

const ContactHN = () => {
  const { t } = useTranslation();

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const CONTACT_LIST = [
    {
      fullName: 'Mrs. Phí Phương Thanh',
      fullName_en: 'Mrs. Phi Phuong Thanh',
      image: '/images/contact-user-1.webp',
      position: 'Trưởng phòng Kinh doanh',
      position_en: 'Sales Manager',
      phone: '+84 788 339 379',
      email: 'thanhptp@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Linh Thu Trang',
      fullName_en: 'Mrs. Linh Thu Trang',
      image: '/images/contact-user-2.webp',
      position: 'Nhân viên Kinh doanh',
      position_en: 'Salers Officer',
      phone: '+84 343 393 799',
      email: 'tranglt@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Mai Vân Anh',
      fullName_en: 'Mrs. Mai Van Anh',
      image: '/images/contact-user-3.webp',
      position: 'Nhân viên Kinh doanh',
      position_en: 'Saler Officer',
      phone: '+84 973 123 230',
      email: 'anhmtv@hisweetievietnam.com.vn'
    },
    {
      fullName: 'Mrs. Nguyễn Thị Mai Phương',
      fullName_en: 'Mrs. Nguyen Thi Mai Phuong',
      image: '/images/maiphuong.webp',
      position: 'Nhân viên Kinh doanh',
      position_en: 'Saler Officer',
      phone: '+84 906 300 204',
      email: 'phuongnt@hisweetievietnam.com.vn'
    },
    // {
    //   fullName: 'Mr. Bàng Anh Vũ',
    //   fullName_en: 'Mr. Bang Anh Vu',
    //   image: '/images/vuba.webp',
    //   position: 'Nhân viên Kinh doanh',
    //   position_en: 'Saler Officer',
    //   phone: '+84 392 682 088',
    //   email: 'vuba@hisweetievietnam.com.vn'
    // },
    {
      fullName: 'Mrs. Tạ Thị Trang',
      fullName_en: 'Mrs. Ta Thi Trang',
      image: '/images/contact-user-5.webp',
      position: 'Sale Admin',
      position_en: 'Sale Admin',
      phone: '+84 788 339 379',
      email: 'trangtt@hisweetievietnam.com.vn'
    }
  ];

  return (
    <Flex direction="column" align="center" px={PX_ALL} pos="relative" zIndex={5}>
      <SectionBlock title={t('contact.title')} />
      <p style={{ fontSize: '24px', marginTop: '15px' }}>{t('contact.desc')}</p>

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
