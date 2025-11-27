export const ARTICLE_TYPES = {
  NEWS: 'NEWS',
  CULTURE: 'CULTURE',
  VIDEO: 'VIDEO',
  KIEN_THUC_NGUYEN_LIEU: 'KIEN_THUC_NGUYEN_LIEU',
  KIEN_THUC_TRA: 'KIEN_THUC_TRA',
  TREND_PHA_CHE: 'TREND_PHA_CHE',
  REVIEW_SAN_PHAM: 'REVIEW_SAN_PHAM',
  CONG_THUC_PHA_CHE: 'CONG_THUC_PHA_CHE',

  NEWS_EN: 'NEWS_EN',
  CULTURE_EN: 'CULTURE',
  VIDEO_EN: 'VIDEO',
  KIEN_THUC_NGUYEN_LIEU_EN: 'KIEN_THUC_NGUYEN_LIEU_EN',
  KIEN_THUC_TRA_EN: 'KIEN_THUC_TRA_EN',
  TREND_PHA_CHE_EN: 'TREND_PHA_CHE_EN',
  REVIEW_SAN_PHAM_EN: 'REVIEW_SAN_PHAM_EN',
  CONG_THUC_PHA_CHE_EN: 'CONG_THUC_PHA_CHE_EN'
};

export const ARTICLE_TYPE_LABELS = {
  [ARTICLE_TYPES.NEWS]: 'Tin Tức',
  [ARTICLE_TYPES.NEWS_EN]: 'News',
  [ARTICLE_TYPES.CULTURE]: 'Văn Hóa',
  [ARTICLE_TYPES.CULTURE_EN]: 'Culture',
  [ARTICLE_TYPES.VIDEO]: 'Video',
  [ARTICLE_TYPES.VIDEO_EN]: 'Video',
  [ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU]: 'Kiến Thức Nguyên Liệu Pha Chế',
  [ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU_EN]: 'Knowledge of Ingredients for Mixing',
  [ARTICLE_TYPES.KIEN_THUC_TRA]: 'Kiến Thức Về Trà',
  [ARTICLE_TYPES.KIEN_THUC_TRA_EN]: 'Knowledge About Tea',
  [ARTICLE_TYPES.TREND_PHA_CHE]: 'Trend Pha Chế',
  [ARTICLE_TYPES.TREND_PHA_CHE_EN]: 'Trend Mixing',
  [ARTICLE_TYPES.REVIEW_SAN_PHAM]: 'Review - Đánh Giá Sản Phẩm',
  [ARTICLE_TYPES.REVIEW_SAN_PHAM_EN]: 'Review - Product Evaluation',
  [ARTICLE_TYPES.CONG_THUC_PHA_CHE]: 'Công thức pha chế',
  [ARTICLE_TYPES.CONG_THUC_PHA_CHE_EN]: 'Preparation Recipe'
};

export const ARTICLE_SECTIONS = [
  {
    type: ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_NGUYEN_LIEU_EN],
    slug: 'kien-thuc-nguyen-lieu-pha-che',
    href: '/bai-viet/kien-thuc-nguyen-lieu-pha-che'
  },
  {
    type: ARTICLE_TYPES.KIEN_THUC_TRA,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_TRA],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_TRA],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.KIEN_THUC_TRA_EN],
    slug: 'kien-thuc-ve-tra',
    href: '/bai-viet/kien-thuc-ve-tra'
  },
  {
    type: ARTICLE_TYPES.TREND_PHA_CHE,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.TREND_PHA_CHE],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.TREND_PHA_CHE],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.TREND_PHA_CHE_EN],
    slug: 'trend-pha-che',
    href: '/bai-viet/trend-pha-che'
  },
  {
    type: ARTICLE_TYPES.REVIEW_SAN_PHAM,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.REVIEW_SAN_PHAM],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.REVIEW_SAN_PHAM],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.REVIEW_SAN_PHAM_EN],
    slug: 'review-danh-gia-san-pham',
    href: '/bai-viet/review-danh-gia-san-pham'
  },
  {
    type: ARTICLE_TYPES.CONG_THUC_PHA_CHE,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.CONG_THUC_PHA_CHE],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.CONG_THUC_PHA_CHE],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.CONG_THUC_PHA_CHE_EN],
    slug: 'cong-thuc-pha-che',
    href: '/bai-viet/cong-thuc-pha-che'
  },
  {
    type: ARTICLE_TYPES.NEWS,
    label: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.NEWS],
    name: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.NEWS],
    name_en: ARTICLE_TYPE_LABELS[ARTICLE_TYPES.NEWS_EN],
    slug: 'tin-tuc',
    href: '/bai-viet/tin-tuc'
  }
];

export const getArticleTypeBySlug = (slug) => {
  return ARTICLE_SECTIONS.find((section) => section.slug === slug);
};

export const getArticleLabelByType = (type) => {
  return ARTICLE_TYPE_LABELS[type] || type;
};
