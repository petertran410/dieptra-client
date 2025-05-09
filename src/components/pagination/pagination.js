'use client';

import { IMG_ALT } from '../../utils/const';
import { useSetParamsURL } from '../../utils/hooks';
import { Flex, Image, Text } from '@chakra-ui/react';

const Pagination = (props) => {
  const { totalPages, currentPage = 1 } = props;
  const setParamsURL = useSetParamsURL();

  return (
    <Flex h="40px" borderRadius={8} gap="16px" justify="center" w="fit-content" mx="auto">
      <button
        type="button"
        onClick={() => {
          if (currentPage === 1) {
            return;
          }
          setParamsURL({ page: currentPage + 1 });
        }}
      >
        <Image src="/images/chevron-left-circle.png" alt={IMG_ALT} w="40px" h="40px" />
      </button>

      {Array.from(Array(totalPages).keys()).map((item) => {
        const isActive = currentPage === item + 1;

        return (
          <button
            type="button"
            key={item}
            onClick={() => {
              if (currentPage === item + 1) {
                return;
              }
              setParamsURL({ page: item + 1 });
            }}
          >
            <Text
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={8}
              fontSize={16}
              fontWeight={500}
              bgColor={isActive ? '#d4d4d8' : '#F4F4F5'}
              color={isActive ? '#FFF' : undefined}
              transitionDuration="200ms"
              _hover={{
                bgColor: isActive ? undefined : '#e6e6e6'
              }}
            >
              {item + 1}
            </Text>
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => {
          if (currentPage === totalPages) {
            return;
          }
          setParamsURL({ page: currentPage - 1 });
        }}
      >
        <Image src="/images/chevron-right-circle.png" alt={IMG_ALT} w="40px" h="40px" />
      </button>
    </Flex>
  );
};

export default Pagination;
