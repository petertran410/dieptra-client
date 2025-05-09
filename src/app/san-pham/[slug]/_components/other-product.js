import ProductItem from '../../../../components/product-item';
import SectionBlock from '../../../../components/section-block';
import { Flex, Grid, GridItem } from '@chakra-ui/react';

const OtherProduct = ({ productList, productId }) => {
  const data = productId ? productList?.filter((i) => i.id !== Number(productId)) : productList;

  return (
    <Flex direction="column" gap="24px">
      <SectionBlock title="Sản phẩm tương tự" />

      <Grid
        templateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={{ xs: '16px', lg: '24px' }}
      >
        {data?.slice(0, 5)?.map((item) => {
          return (
            <GridItem key={item.id}>
              <ProductItem item={item} />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default OtherProduct;
