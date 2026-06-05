import { redirect } from 'next/navigation';

// ====== ĐÃ TẠM ẨN CHỨC NĂNG GIỎ HÀNG ======
// Toàn bộ logic giỏ hàng được giữ lại (comment) để có thể khôi phục sau.
// Hiện tại route này tự động chuyển hướng về trang chủ.
//
// import { getMetadata } from '../../utils/helper-server';
// import CartWrapper from './_components/cart-wrapper';
//
// export const metadata = getMetadata({ title: 'Giỏ hàng' });
//
// const Cart = () => {
//   return <CartWrapper />;
// };
//
// export default Cart;

const Cart = () => {
  redirect('/');
};

export default Cart;
