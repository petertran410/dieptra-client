import { getMetadata } from '@/utils/helper-server';
import CartWrapper from './_components/cart-wrapper';

export const metadata = getMetadata({ title: 'Giỏ hàng | Diệp Trà' });

const Cart = () => {
  return <CartWrapper />;
};

export default Cart;
