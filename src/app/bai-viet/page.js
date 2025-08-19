import { getMetadata } from '../../utils/helper-server';
import ArticleMainWrapper from './_components/article-main-wrapper';

export const metadata = getMetadata({
  title: 'Bài Viết | Diệp Trà',
  description:
    'Khám phá kho kiến thức phong phú về pha chế, nguyên liệu, xu hướng và những câu chuyện thú vị trong thế giới đồ uống tại Diệp Trà.'
});

const ArticleMain = () => {
  return <ArticleMainWrapper />;
};

export default ArticleMain;
