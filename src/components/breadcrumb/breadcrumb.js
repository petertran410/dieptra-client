import { IMG_ALT } from '../../utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';

const Breadcrumb = (props) => {
  const { data } = props;

  return (
    <Flex align="center" gap="12px" pl={{ xs: 0, lg: '16px' }}>
      {data.map((item, index) => {
        const { title, href, isActive } = item;

        return (
          <Fragment key={href}>
            <Link href={href}>
              <Text
                fontWeight={500}
                fontSize={16}
                color={isActive ? '#09090B' : '#A1A1AA'}
                transitionDuration="200ms"
                _hover={{ color: '#09090B' }}
              >
                {title}
              </Text>
            </Link>
            {index !== data.length - 1 && <Image src="/images/chevron-right.webp" alt={IMG_ALT} w="16px" h="16px" />}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default Breadcrumb;
