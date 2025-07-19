'use client';

import { IMG_ALT } from '../../../../utils/const';
import { AspectRatio, Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState } from 'react';

const ProductImage = ({ imagesUrl }) => {
  const [activeImage, setActiveImage] = useState(imagesUrl?.[0]?.replace('http://', 'https://'));

  return (
    <Flex direction="column" gap="16px">
      <Flex
        w={{ xs: 'full', md: '350px', lg: '508px' }}
        h={{ xs: '350px', md: '350px', lg: '508px' }}
        align="center"
        justify="center"
        bgColor="#f4f4f5"
        borderRadius={16}
      >
        <Image src={activeImage || '/images/tra-phuong-hoang.webp'} h="90%" w="auto" fit="cover" alt={IMG_ALT} />
      </Flex>
      <Grid templateColumns={'repeat(4, 1fr)'} gap="20px">
        {imagesUrl?.map((item, index) => {
          return (
            <GridItem
              key={index}
              borderRadius={16}
              bgColor="#f4f4f5"
              cursor="pointer"
              onClick={() => setActiveImage(item?.replace('http://', 'https://'))}
            >
              <AspectRatio ratio={1 / 1} w="full">
                <Flex align="center" justify="center">
                  <Image
                    src={item?.replace('http://', 'https://') || `/images/tra-phuong-hoang.webp`}
                    h="80%"
                    w="full"
                    fit="contain"
                    alt={IMG_ALT}
                  />
                </Flex>
              </AspectRatio>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ProductImage;
