import { getMetadata } from '../../utils/helper-server';
import RegisterWrapper from './_components/register-wrapper';

export const metadata = getMetadata({ title: 'Đăng ký tài khoản' });

const Register = () => {
  return <RegisterWrapper />;
};

export default Register;
