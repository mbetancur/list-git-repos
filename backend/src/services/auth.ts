import { users } from '../types/user';

export const signup = (username: string, password: string): { success: boolean; error?: string } => {
  if (users.some(user => user.username === username)) {
    return { success: false, error: 'Username already exists' };
  }

  users.push({ username, password });
  return { success: true };
};

export const login = (username: string, password: string): { success: boolean; error?: string } => {
  const user = users.find(user => user.username === username);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Invalid password' };
  }

  return { success: true };
}; 