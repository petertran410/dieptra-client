import Breadcrumb from '../../../components/breadcrumb';
import { API } from '../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { formatCurrency, META_DESCRIPTION } from '../../../utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { WORK_MODE, WORK_TYPE } from '../_components/data';
import FormApply from './_components/form-apply';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/job/client/${id}`);
  const data = await response.json();

  const { title: titleData, imagesUrl } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('https://', 'http://') || '/images/preview.png';
  const title = `${titleData} | Diệp Trà`;
  const description = META_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl]
    }
  };
}

const RecruitmentDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const jobDetail = await API.request({ url: `/api/job/client/${id}` });

  if (!jobDetail) {
    return null;
  }

  const {
    title,
    employmentType,
    jobDescription,
    location,
    vacancies,
    applicationDeadline,
    workingHours,
    workMode,
    salaryRanges
  } = jobDetail || [];

  let salary = '';
  if (!salaryRanges) {
    salary = 'Thoả thuận';
  } else if (salaryRanges?.min === salaryRanges?.max) {
    salary = formatCurrency(salaryRanges?.min);
  } else {
    salary = formatCurrency(salaryRanges?.min) + ' đến ' + formatCurrency(salaryRanges?.max);
  }

  return (
    <Flex direction="column" pt={{ xs: '70px', lg: '162px' }} pb="40px">
      <Box px={PX_ALL}>
        <Breadcrumb
          data={[
            { title: 'Tuyển dụng', href: '/tuyen-dung' },
            { title: 'Mô tả vị trí', href: `/tuyen-dung/${slug}`, isActive: true }
          ]}
        />

        <Text as="h1" mt="20px" fontSize={24} fontWeight={600}>
          {title}
        </Text>

        <Flex
          mt="20px"
          borderRadius={16}
          p="24px"
          border="1px solid #77D0E8"
          gap={{ xs: '10px', lg: '48px' }}
          direction={{ xs: 'column', lg: 'row' }}
        >
          <Flex flex={1 / 2} direction="column" gap="12px">
            <Flex align="flex-start" gap="4px">
              <Image mt="4px" src="/images/calendar.png" w="16px" h="16px" alt={IMG_ALT} />
              <Text fontSize={16}>Mức lương: {salary}</Text>
            </Flex>
            <Flex align="flex-start" gap="4px">
              <Image mt="4px" src="/images/calendar.png" w="16px" h="16px" alt={IMG_ALT} />
              <Text fontSize={16}>Thời hạn ứng tuyển: {dayjs(applicationDeadline).format('DD/MM/YYYY')}</Text>
            </Flex>
          </Flex>
          <Flex flex={1 / 2} direction="column" gap="12px">
            <Flex align="flex-start" gap="4px">
              <Image mt="4px" src="/images/user.png" w="16px" h="16px" alt={IMG_ALT} />
              <Text fontSize={16}>Số lượng: {vacancies} người</Text>
            </Flex>
            <Flex align="flex-start" gap="4px">
              <Image mt="4px" src="/images/clock.png" w="16px" h="16px" alt={IMG_ALT} />
              <Text fontSize={16}>
                Thời gian làm việc:{' '}
                {!isEmpty(workingHours) ? workingHours?.map((i) => `${i.start} - ${i.end}`)?.join(', ') : 'Thoả thuận'}{' '}
                {workingHours?.length > 1 && (
                  <Text as="span" fontSize={16} color="#828282">
                    (nhiều ca linh hoạt)
                  </Text>
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="center" gap="8px" mt="20px">
          <Box px="8px" py="2px" borderRadius={4} bgColor="#E4E4E7">
            <Text>{WORK_TYPE.find((i) => i.value === employmentType)?.label}</Text>
          </Box>
          <Box px="8px" py="2px" borderRadius={4} bgColor="#E4E4E7">
            <Text>{WORK_MODE.find((i) => i.value === workMode)?.label}</Text>
          </Box>
        </Flex>

        <Box mt="20px">
          <Text fontSize={16} fontWeight={500}>
            Địa điểm làm việc:{' '}
            <Text as="span" fontSize={16} fontWeight={400}>
              {location}
            </Text>
          </Text>
        </Box>

        <Box
          mt="20px"
          fontSize={16}
          whiteSpace="pre-line"
          className="html-content html-content-16px"
          dangerouslySetInnerHTML={{
            __html: jobDescription
          }}
        />
      </Box>

      <FormApply jobId={id} />
    </Flex>
  );
};

export default RecruitmentDetail;
