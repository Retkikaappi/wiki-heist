import { useContext } from 'react';
import UserContext from '../../context/userContext';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

const Login = () => {
  const { user } = useContext(UserContext);

  return <>{user ? <Dashboard /> : <LoginForm />}</>;
};

export default Login;
