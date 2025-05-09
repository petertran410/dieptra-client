'use client';

import Pagination from '../../../components/pagination';
import { useQueryJobList } from '../../../services/job.service';
import { IMG_ALT } from '../../../utils/const';
import { convertSlugURL, formatCurrency } from '../../../utils/helper-server';
import { Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { WORK_TYPE } from './data';

const JobList = () => {
  const { data: dataQuery } = useQueryJobList();
  const { content = [], pageable, totalPages } = dataQuery || {};
  const { pageNumber } = pageable || {};

  return (
    <>
      <Flex mt="24px" direction="column" gap="16px">
        {content?.map((item) => {
          const { title, id, employmentType, vacancies, applicationDeadline, salaryRanges } = item;
          let salary = '';
          if (!salaryRanges) {
            salary = 'Thoả thuận';
          } else if (salaryRanges?.min === salaryRanges?.max) {
            salary = formatCurrency(salaryRanges?.min);
          } else {
            salary = formatCurrency(salaryRanges?.min) + ' - ' + formatCurrency(salaryRanges?.max);
          }

          return (
            <Link href={`/tuyen-dung/${convertSlugURL(title)}.${id}`} key={id} style={{ display: 'block' }}>
              <Flex
                direction={{ xs: 'column', lg: 'row' }}
                borderRadius={16}
                border="1px solid #F4F4F5"
                p={{ xs: '16px', lg: '24px' }}
                gap={{ xs: '8px', lg: '24px' }}
                transitionDuration="250ms"
                _hover={{ boxShadow: 'md' }}
              >
                <Flex flex={1} direction="column" gap="8px">
                  <Flex align="flex-start" gap="8px">
                    <Text color="#FFF" borderRadius={4} fontWeight={500} bgColor="#EF4444" px="4px">
                      HOT
                    </Text>
                    <Text fontSize={18} fontWeight={500} noOfLines={2} mt="-2px">
                      {title}
                    </Text>
                  </Flex>
                  <Flex align="center" gap="24px">
                    <Flex align="center" gap="4px">
                      <Image src="/images/clock.png" w="16px" h="16px" alt={IMG_ALT} />
                      <Text fontSize={16}>{WORK_TYPE.find((i) => i.value === employmentType)?.label}</Text>
                    </Flex>
                    <Flex align="center" gap="4px">
                      <Image src="/images/user.png" w="16px" h="16px" alt={IMG_ALT} />
                      <Text fontSize={16}>{vacancies} người</Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  align={{ xs: 'flex-start', lg: 'center' }}
                  gap={{ xs: '6px', lg: '60px' }}
                  direction={{ xs: 'column', lg: 'row' }}
                >
                  <Text textAlign="center" fontSize={18} fontWeight={500}>
                    {salary}
                  </Text>
                  <Text textAlign="center" fontSize={18} fontWeight={500}>
                    {dayjs(applicationDeadline).format('DD/MM/YYYY')}
                  </Text>
                  <Flex
                    mt={{ xs: '4px', lg: 0 }}
                    align="center"
                    justify="center"
                    bgColor="#FFF"
                    border="1px solid"
                    borderColor="#065FD4"
                    color="#065FD4"
                    w="132px"
                    h="32px"
                    gap="4px"
                    fontSize={16}
                    borderRadius={8}
                    fontWeight={500}
                    transitionDuration="250ms"
                    _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
                  >
                    Ứng tuyển ngay
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          );
        })}
      </Flex>

      {!!content?.length && (
        <Flex mt="16px" justify="center">
          <Pagination currentPage={pageNumber + 1} totalPages={totalPages} />
        </Flex>
      )}
    </>
  );
};

export default JobList;
