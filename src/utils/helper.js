import { createStandaloneToast, Flex, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { IMG_ALT } from './const';

export const showToast = (config) => {
  const { content, status = 'info', title, icon } = config;
  const { toast } = createStandaloneToast();

  const render = ({ onClose }) => {
    if (status === 'error') {
      return (
        <Flex
          align="center"
          justify="space-between"
          bgColor={{ xs: '#FFF', lg: 'red.50' }}
          border="1px solid red"
          borderRadius={16}
          px="14px"
          py="16px"
          gap="8px"
          minW={{ xs: '300px', lg: '400px' }}
        >
          <Flex align="center" gap="8px">
            <Image src={icon || '/images/danger.webp'} alt={IMG_ALT} w="24px" h="24px" />
            <Text fontWeight={500} fontSize={18} color="red">
              {content}
            </Text>
          </Flex>

          <button type="button" onClick={onClose}>
            <Image src="/images/close-red.webp" alt={IMG_ALT} w="24px" h="24px" />
          </button>
        </Flex>
      );
    }

    return (
      <Flex
        align="center"
        justify="space-between"
        bgColor={{ xs: '#FFF', lg: '#e6f5f0' }}
        border="1px solid #059669"
        borderRadius={16}
        px="14px"
        py="16px"
        gap="8px"
        minW={{ xs: '300px', lg: '400px' }}
      >
        <Flex align="center" gap="8px">
          <Image src={icon || '/images/tick-circle.webp'} alt={IMG_ALT} w="24px" h="24px" />
          <Text fontWeight={500} fontSize={18} color="#059669">
            {content}
          </Text>
        </Flex>

        <button type="button" onClick={onClose}>
          <Image src="/images/close.webp" alt={IMG_ALT} w="24px" h="24px" />
        </button>
      </Flex>
    );
  };

  return toast({
    description: content,
    status,
    title,
    duration: 4000,
    isClosable: true,
    position: 'top-right',
    render
  });
};

export const useMediaQuery = (query) => {
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));
  const handleChange = useCallback(() => setMatches(getMatches(query)), [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [handleChange, query]);

  return matches;
};

export const getInlineHTML = (cartData = []) => {
  if (!Array.isArray(cartData) || !cartData.length) {
    return '';
  }

  return `<div>
  ${cartData
    .map(
      (i) => `<div style="margin-top: 20px;">
    <img src="${i.imagesUrl?.[0]?.replace(
      'http://',
      'https://'
    )}" style="width: 80px; height: 60px; object-fit:cover; border-radius: 3px; float:left; margin-right: 15px;" />
    <div>
      <p style="font-weight: 600; margin: 0;">${i.title}</p>
      <p>Số lượng: ${i.quantity || 1}</p>
    </div>
  </div>`
    )
    .join('\n')}
</div>`;
};
