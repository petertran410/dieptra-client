// 'use client';

// import ProductItem from '../../../../components/product-item/product-item';
// import { useQueryProductListByCategory } from '../../../../services/product.service';
// import { getCategoryName } from '../../../../utils/helper-server';
// import { Flex, Grid, GridItem } from '@chakra-ui/react';

// const ProductList = ({ category }) => {
//   const { id, name } = category;
//   const { data: dataQuery } = useQueryProductListByCategory({ categoryId: id, isFeatured: true });
//   const { content = [] } = dataQuery || {};

//   return (
//     <Grid templateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="24px">
//       <GridItem
//         pos="relative"
//         borderRadius={16}
//         border="2px solid #FFF"
//         bgImage={{
//           xs: name?.toLowerCase()?.includes('lermao')
//             ? 'url(/images/top-product-lermao-mobile.webp)'
//             : 'url(/images/top-product-dieptra-mobile.webp)',
//           lg: name?.toLowerCase()?.includes('lermao')
//             ? 'url(/images/top-product-lermao.webp)'
//             : 'url(/images/top-product-dieptra.webp)'
//         }}
//         bgSize="cover"
//         bgRepeat="no-repeat"
//       >
//         <Flex align="center" justify="center" h={{ xs: '128px', md: 'full' }} flex={1}>
//           {getCategoryName(name)}
//         </Flex>
//       </GridItem>

//       {content?.slice(0, 3)?.map((item) => {
//         return (
//           <GridItem key={item.id}>
//             <ProductItem item={item} isFeatured />
//           </GridItem>
//         );
//       })}
//     </Grid>
//   );
// };

// export default ProductList;
