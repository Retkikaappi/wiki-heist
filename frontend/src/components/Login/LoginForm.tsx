import { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import { loginUser } from '../../services/login';

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);
    const loggedUser = await loginUser({ username, password });
    setUsername('');
    setPassword('');
    if (loggedUser.token) {
      localStorage.setItem('bazaar-token', loggedUser.token);
      setUser(loggedUser.token);
    }
  };
  return (
    <>
      <p className='mb-4'>Admin login</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          type='text'
          className='bg-white placeholder-gray-700 text-black  rounded-xs p-1 text-center'
          placeholder='username'
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <input
          type='password'
          className='bg-white placeholder-gray-700 text-black rounded-xs p-1 text-center'
          placeholder='password'
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <button className='bg-bazaarBtn rounded-xs p-1 cursor-pointer hover:bg-blue-500 transition'>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
