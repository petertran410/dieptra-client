'use client';

import { useState } from 'react';
import { Box, VStack, HStack, AspectRatio, Image, Flex, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from '@chakra-ui/icons';

const ProductImageGallery = ({ title, imagesUrl, kiotViet }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAllImages = () => {
    const primaryImages = imagesUrl && imagesUrl.length > 0 ? imagesUrl : [];
    const kiotVietImages = kiotViet?.images || [];

    if (primaryImages.length > 0) {
      return [...primaryImages, ...kiotVietImages];
    }
    return kiotVietImages;
  };

  const allImages = getAllImages();
  const currentImage = allImages[selectedImageIndex];

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  if (allImages.length === 0) {
    return (
      <AspectRatio ratio={1} w="full" maxW="500px">
        <Box bg="gray.100" borderRadius="lg" border="1px solid #E2E8F0">
          <Flex align="center" justify="center" h="full" color="#FFF">
            Ảnh đại diện [vuông]
          </Flex>
        </Box>
      </AspectRatio>
    );
  }

  return (
    <VStack spacing={4}>
      <AspectRatio ratio={1} w="full" maxW="500px">
        <Box borderRadius="lg" overflow="hidden" position="relative" cursor="pointer" onClick={onOpen}>
          <Image
            src={currentImage}
            alt={`${title} - Ảnh ${selectedImageIndex + 1}`}
            w="full"
            h="full"
            style={{ objectFit: 'fill' }}
            fallbackSrc="/images/placeholder-product.webp"
          />

          {allImages.length > 1 && (
            <>
              <IconButton
                aria-label="Previous image"
                icon={<ChevronLeftIcon />}
                position="absolute"
                left="10px"
                top="50%"
                transform="translateY(-50%)"
                bg="whiteAlpha.800"
                _hover={{ bg: 'whiteAlpha.900' }}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              />
              <IconButton
                aria-label="Next image"
                icon={<ChevronRightIcon />}
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                bg="whiteAlpha.800"
                _hover={{ bg: 'whiteAlpha.900' }}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              />
            </>
          )}
        </Box>
      </AspectRatio>

      {allImages.length > 1 && (
        <HStack spacing={2} justify="center" flexWrap="wrap" maxW="500px">
          {allImages.slice(0, 6).map((imageUrl, index) => (
            <AspectRatio key={index} ratio={1} w="60px" flexShrink={0}>
              <Box
                bg="gray.50"
                border={selectedImageIndex === index ? '2px solid #003366' : '1px solid #E2E8F0'}
                borderRadius="md"
                cursor="pointer"
                overflow="hidden"
                opacity={selectedImageIndex === index ? 1 : 0.7}
                _hover={{ opacity: 1, transform: 'scale(1.05)' }}
                transition="all 0.2s ease"
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={imageUrl}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                  fallbackSrc="/images/placeholder-product.webp"
                />
              </Box>
            </AspectRatio>
          ))}

          {allImages.length > 6 && (
            <Flex
              align="center"
              justify="center"
              w="60px"
              h="60px"
              bg="gray.100"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              onClick={onOpen}
            >
              <Text fontSize="xs" color="gray.600" fontWeight="500">
                +{allImages.length - 10}
              </Text>
            </Flex>
          )}
        </HStack>
      )}
    </VStack>
  );
};

export default ProductImageGallery;
