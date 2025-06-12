import { getMetadata } from '../../../utils/helper-server';
import PaymentSuccessWrapper from './_components/payment-success-wrapper';

export const metadata = getMetadata({ title: 'Thanh toán thành công | Diệp Trà' });

const PaymentSuccess = () => {
  return <PaymentSuccessWrapper />;
};

export default PaymentSuccess;
