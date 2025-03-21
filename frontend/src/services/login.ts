import { LoginResponse } from '../types';

const baseUrl = '/api/login';

export const loginUser = async (user: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const resp = await fetch(baseUrl, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user),
  });
  return resp.json();
};

export const authenticate = async (token: string) => {
  const resp = await fetch(`${baseUrl}/authenticate`, {
    headers: { Authentication: `Bearer ${token}` },
  });

  return resp.json();
};
