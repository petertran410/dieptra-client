'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import { useQueryBlogCultureList } from '../../../services/culture.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL } from '../../../utils/helper-server';
import { AspectRatio, Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Culture = () => {
  const { data: dataQuery } = useQueryBlogCultureList();
  const { content: blogList = [] } = dataQuery || {};
  const { t, getLocalizedText } = useTranslation();

  return (
    <Flex px={PX_ALL} direction="column" align="center" mt={{ xs: '24px', lg: '48px' }}>
      <Text as="h1" textAlign="center" fontSize={24} fontWeight={500} textTransform="uppercase">
        {t('recruit.slogan')}{' '}
        <Text as="span" fontSize={24} fontWeight={500} color="#1E96BC">
          {t('recruit.company.upperkey')}
        </Text>
      </Text>

      <Grid mt="24px" w="full" gap="24px" templateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
        {blogList?.slice(0, 6)?.map((item, index) => {
          const { title, title_en, imagesUrl, id } = item;

          return (
            <GridItem key={index}>
              <Link href={`/van-hoa/${convertSlugURL(title)}.${id}`} style={{ display: 'block', width: '100%' }}>
                <AspectRatio ratio={10 / 9} w="full">
                  <Box w="full" h="full" pos="relative">
                    <Image
                      w="full"
                      h="full"
                      src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/image-recruitment-1.webp'}
                      fit="cover"
                      alt={IMG_ALT}
                    />

                    <Flex
                      align="flex-end"
                      w="full"
                      h="full"
                      pos="absolute"
                      top={0}
                      left={0}
                      bgGradient="linear-gradient(to top, #d4f1f9 0%, #d4f1f991 60%, transparent 100%)"
                      zIndex={2}
                    >
                      <Text
                        fontSize={{ xs: 56, lg: 120 }}
                        fontWeight={900}
                        color="#ffffff85"
                        pos="relative"
                        top={{ xs: '-10px', lg: '10px' }}
                        pl="4px"
                      >
                        0{index + 1}
                      </Text>
                    </Flex>
                    <Flex align="flex-end" zIndex={3} h="full" w="full" pos="absolute" top={0} bottom={0} p="12px">
                      <Text textDecor="underline" noOfLines={1} fontSize={18} fontWeight={500} color="#065FD4">
                        {getLocalizedText(title, title_en)}
                      </Text>
                    </Flex>
                  </Box>
                </AspectRatio>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Culture;
