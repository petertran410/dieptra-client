'use client';

import { IMG_ALT } from '../../../utils/const';
import { useParamsURL } from '../../../utils/hooks';
import { Button, Flex, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Search = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword } = paramsURL;
  const [keywordText, setKeywordText] = useState(keyword);

  return (
    <Flex align="center" justify="center" gap={{ xs: '8px', lg: '16px' }} mt="24px">
      <Flex pos="relative" w={{ xs: 'full', lg: '50%' }}>
        <Input
          w="full"
          h="32px"
          borderRadius={8}
          bgColor="#F4F4F5"
          fontSize={16}
          fontWeight={500}
          pl="16px"
          pr="36px"
          placeholder="Tìm kiếm vị trí, địa điểm làm việc"
          _placeholder={{ color: '#A1A1AA' }}
          value={keywordText}
          onChange={(e) => setKeywordText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setParamsURL({ keyword: keywordText?.trim() });
            }
          }}
        />
        <Image
          src="/images/search.png"
          alt={IMG_ALT}
          w="16px"
          h="16px"
          zIndex={5}
          pos="absolute"
          top="8px"
          right="8px"
        />
      </Flex>

      <Button
        bgColor="#065FD4"
        color="#FFF"
        w="90px"
        h="32px"
        gap="4px"
        fontSize={16}
        borderRadius={8}
        fontWeight={500}
        transitionDuration="250ms"
        _hover={{ bgColor: '#5d97e3' }}
        _active={{ bgColor: '#5d97e3' }}
        onClick={() => setParamsURL({ keyword: keywordText?.trim() })}
      >
        Tìm kiếm
      </Button>
    </Flex>
  );
};

export default Search;
