// src/utils/article-types.js - MỚI
export const ARTICLE_TYPES = {
  NEWS: 'NEWS',
  CULTURE: 'CULTURE',
  VIDEO: 'VIDEO',
  KIEN_THUC_NGUYEN_LIEU: 'KIEN_THUC_NGUYEN_LIEU',
  KIEN_THUC_TRA: 'KIEN_THUC_TRA',
  TREND_PHA_CHE: 'TREND_PHA_CHE',
  REVIEW_SAN_PHAM: 'REVIEW_SAN_PHAM',
  CONG_THUC_PHA_CHE: 'CONG_THUC_PHA_CHE'
};

export const ARTICLE_TYPE_LABELS = {
  [ARTICLE_TYPES.NEWS]: 'Tin Tức',
  [ARTICLE_TYPES.CULTURE]: 'Văn Hóa',
  [ARTICLE_TYPES.VIDEO]: 'Video',
  [ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU]: 'Kiến Thức Nguyên Liệu Pha Chế',
  [ARTICLE_TYPES.KIEN_THUC_TRA]: 'Kiến Thức Về Trà',
  [ARTICLE_TYPES.TREND_PHA_CHE]: 'Trend Pha Chế',
  [ARTICLE_TYPES.REVIEW_SAN_PHAM]: 'Review - Đánh Giá Sản Phẩm',
  [ARTICLE_TYPES.CONG_THUC_PHA_CHE]: 'Công thức pha chế'
};

export const ARTICLE_SECTIONS = [
  {
    type: ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU],
    slug: 'kien-thuc-nguyen-lieu-pha-che',
    href: '/bai-viet/kien-thuc-nguyen-lieu-pha-che'
  },
  {
    type: ARTICLE_TYPES.KIEN_THUC_TRA,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_TRA],
    slug: 'kien-thuc-ve-tra',
    href: '/bai-viet/kien-thuc-ve-tra'
  },
  {
    type: ARTICLE_TYPES.TREND_PHA_CHE,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.TREND_PHA_CHE],
    slug: 'trend-pha-che',
    href: '/bai-viet/trend-pha-che'
  },
  {
    type: ARTICLE_TYPES.REVIEW_SAN_PHAM,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.REVIEW_SAN_PHAM],
    slug: 'review-danh-gia-san-pham',
    href: '/bai-viet/review-danh-gia-san-pham'
  },
  {
    type: ARTICLE_TYPES.CONG_THUC_PHA_CHE,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.CONG_THUC_PHA_CHE],
    slug: 'cong-thuc-pha-che',
    href: '/bai-viet/cong-thuc-pha-che'
  },
  {
    type: ARTICLE_TYPES.NEWS,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.NEWS],
    slug: 'tin-tuc',
    href: '/bai-viet/tin-tuc'
  }
];

// Helper functions
export const getArticleTypeBySlug = (slug) => {
  return ARTICLE_SECTIONS.find((section) => section.slug === slug);
};

export const getArticleLabelByType = (type) => {
  return ARTICLE_TYPE_LABELS[type] || type;
};
