import { createContext } from 'react';
import { UserContextInit } from '../types';

const UserContext = createContext<UserContextInit>({
  user: null,
  setUser: () => {},
});

export default UserContext;
