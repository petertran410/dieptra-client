import { PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Suspense } from 'react';
import Activity from './_components/activity';
import Banner from './_components/banner';
import Culture from './_components/culture';
import JobList from './_components/job-list';
import Search from './_components/search';
import RecruitmentClient from './_components/recruitment-client';

export const metadata = getMetadata({ title: 'Tuyển dụng' });

const Recruitment = () => {
  return (
    <Suspense>
      <RecruitmentClient />
    </Suspense>
  );
};

export default Recruitment;
