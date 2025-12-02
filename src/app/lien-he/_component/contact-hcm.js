'use client';

import { PX_ALL } from '../../../utils/const';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import SectionBlockH2 from '../../../components/section-block/section-block-h2';
import { useTranslation } from '../../../hooks/useTranslation';

const ContactHCM = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      px={PX_ALL}
      pt={{ xs: '24px', lg: 0 }}
      mt={{ xs: '24px', lg: '10px' }}
      borderTop={{ xs: '2px solid #e6e6e6', lg: 'none' }}
    >
      <SectionBlockH2 title={t('contact.title.hcm')} />

      <Grid
        w="full"
        gap={{ xs: '16px', lg: '24px' }}
        mt="24px"
        direction="column"
        templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
      >
        <GridItem />
        {/* {CONTACT_LIST.map((item, index) => {
          return (
            <GridItem key={index}>
              <ContactItem item={item} />
            </GridItem>
          );
        })} */}
        <GridItem />
      </Grid>
    </Flex>
  );
};

export default ContactHCM;
