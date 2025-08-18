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
    // <Box bgColor="#FFF" minH="100vh">
    //   <Flex direction="column" px={PX_ALL} pb="50px">

    //   </Flex>
    // </Box>
    <ProductList />
  );
};

export default ProductsPage;
