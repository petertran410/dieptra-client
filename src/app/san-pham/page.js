import { getMetadata } from '../../utils/helper-server';
import { PX_ALL } from '../../utils/const';
import { Box, Flex } from '@chakra-ui/react';
import ProductList from './_components/product-list';

export const metadata = getMetadata({
  title: 'Sản phẩm | Diệp Trà',
  description: 'Khám phá đa dạng sản phẩm nguyên liệu pha chế chất lượng cao tại Diệp Trà'
});

const ProductsPage = () => {
  return (
    <Box bgColor="#FFF" minH="100vh">
      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} pb="50px">
        <ProductList />
      </Flex>
    </Box>
  );
};

export default ProductsPage;
