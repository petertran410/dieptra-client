import { getMetadata } from '../../utils/helper-server';
import PaymentWrapper from './_components/payment-wrapper';

export const metadata = getMetadata({ title: 'Thanh toán' });

const Payment = () => {
  return <PaymentWrapper />;
};

export default Payment;
