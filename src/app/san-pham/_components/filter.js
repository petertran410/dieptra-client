// src/app/san-pham/_components/filter.js - CLEANED UP VERSION
'use client';

import { FILTER_OPTIONS } from '../../../services/product.service';
import { IMG_ALT } from '../../../utils/const';
import { useParamsURL } from '../../../utils/hooks';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const Filter = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword, sort } = paramsURL;
  const [keywordText, setKeywordText] = useState(keyword);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const currentSort = useMemo(() => {
    if (!sort) {
      return undefined;
    }
    return FILTER_OPTIONS.find((i) => i.value === sort);
  }, [sort]);

  useEffect(() => {
    if (typeof keyword !== 'undefined') {
      setKeywordText(keyword);
    }
  }, [keyword]);

  return (
    <Flex align="center" gap={{ xs: '8px', lg: '24px' }} mt="24px">
      {/* Sort Dropdown */}
      <Flex flex={{ xs: 'none', lg: 1 / 4 }} w={{ xs: '32px', lg: 'full' }}>
        <Popover matchWidth={{ xs: false, lg: true }} onClose={onClose} isOpen={isOpen}>
          <PopoverTrigger>
            <Box w="full">
              <Button
                display={{ xs: 'none', lg: 'flex' }}
                w="full"
                h="32px"
                justifyContent="space-between"
                bgColor="#F4F4F5"
                fontSize={16}
                fontWeight={500}
                color="#52525B"
                onClick={onOpen}
              >
                {currentSort ? currentSort.label : 'Sắp xếp'}
                <Image src="/images/chevron-down.webp" w="16px" h="16px" alt={IMG_ALT} />
              </Button>
              <Button
                display={{ xs: 'flex', lg: 'none' }}
                w="32px"
                h="32px"
                p={0}
                alignItems="center"
                minW={0}
                minH={0}
                justifyContent="center"
                bgColor="#F4F4F5"
                fontSize={16}
                fontWeight={500}
                borderRadius={8}
                onClick={onOpen}
              >
                <Image src="/images/filter.webp" w="16px" h="16px" alt={IMG_ALT} />
              </Button>
            </Box>
          </PopoverTrigger>
          <PopoverContent borderRadius={8} bgColor="#F4F4F5" p={0} w={{ xs: '200px', lg: 'full' }}>
            <PopoverBody px="0px" py="8px">
              <Flex direction="column" cursor="pointer">
                {FILTER_OPTIONS.map((item) => {
                  const { value, label } = item;
                  return (
                    <Flex
                      key={value}
                      h="32px"
                      align="center"
                      justify="center"
                      data-group
                      onClick={() => {
                        onClose();
                        setParamsURL({ sort: value, page: 1 });
                      }}
                    >
                      <Text
                        fontSize={16}
                        fontWeight={500}
                        color="#52525B"
                        transitionDuration="200ms"
                        _groupHover={{ color: '#000' }}
                      >
                        {label}
                      </Text>
                    </Flex>
                  );
                })}

                {/* Clear Sort Option */}
                <Flex
                  h="32px"
                  align="center"
                  justify="center"
                  data-group
                  borderTop="1px solid #E2E8F0"
                  mt="4px"
                  onClick={() => {
                    onClose();
                    setParamsURL({ sort: undefined, page: 1 });
                  }}
                >
                  <Text
                    fontSize={16}
                    fontWeight={500}
                    color="#E53E3E"
                    transitionDuration="200ms"
                    _groupHover={{ color: '#C53030' }}
                  >
                    Xóa sắp xếp
                  </Text>
                </Flex>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      {/* Search Input */}
      <Flex flex={{ xs: 1, lg: 3 / 4 }} w="full" align="center" gap="16px" direction={{ xs: 'column', lg: 'row' }}>
        <Flex flex={1} pos="relative" w="full">
          <Input
            w="full"
            h="32px"
            borderRadius={8}
            bgColor="#F4F4F5"
            fontSize={16}
            fontWeight={500}
            pl="16px"
            pr="36px"
            placeholder="Nhập tên sản phẩm"
            _placeholder={{ color: '#A1A1AA' }}
            value={keywordText || ''}
            onChange={(e) => setKeywordText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setParamsURL({ keyword: keywordText?.trim(), page: 1 });
              }
            }}
          />
          <Image
            src="/images/search.webp"
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
          display={{ xs: 'none', lg: 'flex' }}
          bgColor="#065FD4"
          color="#FFF"
          w={{ xs: 'full', lg: '154px' }}
          h="32px"
          gap="4px"
          fontSize={16}
          borderRadius={8}
          fontWeight={500}
          transitionDuration="250ms"
          _hover={{ bgColor: '#5d97e3' }}
          _active={{ bgColor: '#5d97e3' }}
          onClick={() => setParamsURL({ keyword: keywordText?.trim(), page: 1 })}
        >
          Tìm kiếm
        </Button>
      </Flex>

      {/* Mobile Search Button */}
      <Flex flex={1} w="full" mt="8px" display={{ xs: 'flex', lg: 'none' }}>
        <Button
          bgColor="main.1"
          color="#FFF"
          w="full"
          h="32px"
          gap="4px"
          fontSize={16}
          borderRadius={8}
          fontWeight={500}
          transitionDuration="250ms"
          _hover={{ opacity: 0.7 }}
          _active={{ opacity: 0.7 }}
          onClick={() => setParamsURL({ keyword: keywordText?.trim(), page: 1 })}
        >
          Tìm kiếm
        </Button>
      </Flex>
    </Flex>
  );
};

export default Filter;
