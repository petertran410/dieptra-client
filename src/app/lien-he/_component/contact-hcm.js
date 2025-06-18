'use client';

import SectionBlock from '../../../components/section-block';
import { PX_ALL } from '../../../utils/const';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import ContactItem from './contact-item';

const ContactHCM = () => {
  const CONTACT_LIST = [
    {
      fullName: 'Mr. Tô Quang Duy',
      image: '/images/contact-user-6.webp',
      position: 'Trưởng phòng Kinh doanh 02',
      phone: '+84 344 879 999',
      email: 'duytq@hisweetievietnam.com.vn'
    }
  ];

  return (
    <Flex
      direction="column"
      align="center"
      px={PX_ALL}
      pt={{ xs: '24px', lg: 0 }}
      mt={{ xs: '24px', lg: '48px' }}
      borderTop={{ xs: '2px solid #e6e6e6', lg: 'none' }}
    >
      <SectionBlock title="phòng kinh doanh tp.hcm" />

      <Grid
        w="full"
        gap={{ xs: '16px', lg: '24px' }}
        mt="24px"
        direction="column"
        templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
      >
        <GridItem />
        {CONTACT_LIST.map((item, index) => {
          return (
            <GridItem key={index}>
              <ContactItem item={item} />
            </GridItem>
          );
        })}
        <GridItem />
      </Grid>
    </Flex>
  );
};

export default ContactHCM;
