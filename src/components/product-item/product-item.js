'use client';

import { cartAtom } from '../../states/common';
import { IMG_ALT } from '../../utils/const';
import { showToast } from '../../utils/helper';
import { convertSlugURL, formatCurrency } from '../../utils/helper-server';
import { AspectRatio, Button, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import ModalContact from '../modal-contact';

const ProductItem = (props) => {
  const { item, isFeatured } = props;
  const [cart, setCart] = useRecoilState(cartAtom);
  const [showContact, setShowContact] = useState(false);

  const { title, id, price, imagesUrl, ofCategories, featuredThumbnail } = item || {};

  let image = imagesUrl?.[0]?.replace('https://', 'http://');
  if (isFeatured && featuredThumbnail) {
    image = featuredThumbnail?.replace('https://', 'http://');
  }

  const onAddCart = () => {
    const isExists = cart.find((i) => Number(i.id) === id);
    if (!isExists) {
      setCart([...cart, { id, quantity: 1 }]);
    }
    showToast({
      status: 'success',
      content: 'Đã thêm vào giỏ hàng'
    });
  };

  if (!item) {
    return null;
  }

  return (
    <Flex direction="column" gap="16px" justify="space-between" data-group>
      <Link href={`/san-pham/${convertSlugURL(title)}.${id}`}>
        <AspectRatio
          ratio={1 / 1}
          w="full"
          justifyContent="center"
          alignItems="center"
          borderRadius={16}
          bgColor="#FFF"
          transitionDuration="250ms"
          _groupHover={{ boxShadow: 'base' }}
        >
          <div>
            <Image src={image} alt={IMG_ALT} w="auto" h="85%" fit="cover" />
          </div>
        </AspectRatio>
      </Link>

      <Flex direction="column" gap="4px">
        <Link href={`/san-pham/${convertSlugURL(title)}.${id}`}>
          <Text noOfLines={2} fontWeight={500} fontSize={{ xs: 16, lg: 18 }}>
            {title}
          </Text>
        </Link>

        <Text noOfLines={2} fontWeight={500} fontSize={{ xs: 16, lg: 18 }} color="#A1A1AA" textTransform="uppercase">
          {ofCategories?.[0]?.name}
        </Text>
        <Flex
          align={{ xs: 'flex-start', lg: 'center' }}
          justify="space-between"
          direction={{ xs: 'column', lg: 'row' }}
          gap="4px"
        >
          <Text fontSize={24} color="main.1">
            {price ? formatCurrency(price) : ''}
          </Text>

          {price ? (
            <Button
              align="center"
              justify="center"
              bgColor="#065FD4"
              color="#FFF"
              w="96px"
              h="32px"
              gap="4px"
              fontSize={16}
              borderRadius={8}
              fontWeight={500}
              _hover={{ bgColor: '#5d97e3' }}
              _active={{ bgColor: '#5d97e3' }}
              onClick={onAddCart}
            >
              Mua hàng
            </Button>
          ) : (
            <Button
              align="center"
              justify="center"
              bgColor="transparent"
              color="#065FD4"
              w="70px"
              h="32px"
              gap="4px"
              fontSize={16}
              borderRadius={8}
              fontWeight={500}
              _hover={{ bgColor: 'transparent', color: '#0f2c3d' }}
              _active={{ bgColor: 'transparent', color: '#0f2c3d' }}
              onClick={() => setShowContact(true)}
            >
              Liên hệ
            </Button>
          )}
        </Flex>
      </Flex>

      <ModalContact open={showContact} onCloseModal={() => setShowContact(false)} defaultNote={title} />
    </Flex>
  );
};

export default ProductItem;
