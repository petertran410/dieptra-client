import { useLanguage } from '../contexts/language-context';

export const TRANSLATIONS = {
  vi: {
    // Header
    home: 'Trang Chủ',
    about: 'Giới Thiệu',
    products: 'Sản Phẩm',
    articles: 'Bài Viết',
    contact: 'Liên Hệ',
    recruitment: 'Tuyển Dụng',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    cart: 'Giỏ hàng',
    buy_now: 'Mua hàng',
    order_info: 'Thông tin đơn hàng',

    // Cart
    add_product: 'Thêm sản phẩm',
    clear_all: 'Xoá tất cả',
    loading_cart: 'Đang tải giỏ hàng...',
    checkout: 'Thanh toán',

    // Auth
    login_required: 'Vui lòng đăng nhập để xem giỏ hàng.',
    logout_success: 'Đã đăng xuất thành công.',

    // Policy
    policy_title: 'Chính Sách Diệp Trà',
    privacy_policy: 'Chính Sách Bảo Mật',
    purchase_policy: 'Chính Sách Mua Hàng',

    // Common
    loading: 'Đang tải...',
    search: 'Tìm kiếm',
    view_detail: 'Chi tiết',
    price: 'Giá',
    quantity: 'Số lượng',
    total: 'Tổng tiền'
  },

  en: {
    // Header
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    articles: 'Articles',
    contact: 'Contact',
    recruitment: 'Recruitment',
    login: 'Login',
    logout: 'Logout',
    cart: 'Cart',
    buy_now: 'Shop Now',
    order_info: 'Order Information',

    // Cart
    add_product: 'Add Products',
    clear_all: 'Clear All',
    loading_cart: 'Loading cart...',
    checkout: 'Checkout',

    // Auth
    login_required: 'Please login to view cart.',
    logout_success: 'Successfully logged out.',

    // Policy
    policy_title: 'DiepTra Policies',
    privacy_policy: 'Privacy Policy',
    purchase_policy: 'Purchase Policy',

    // Common
    loading: 'Loading...',
    search: 'Search',
    view_detail: 'View Details',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total'
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  const t = (key) => {
    return TRANSLATIONS[currentLanguage]?.[key] || key;
  };

  return { t };
};
