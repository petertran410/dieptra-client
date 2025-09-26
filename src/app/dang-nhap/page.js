import { getMetadata } from '../../utils/helper-server';
import LoginWrapper from './_components/login-wrapper';

export const metadata = getMetadata({ title: 'Đăng nhập tài khoản' });

const Login = () => {
  return <LoginWrapper />;
};

export default Login;
