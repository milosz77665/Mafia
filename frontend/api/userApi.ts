import api from './api';

type UserResponse = {
  id: string;
  nickname: string;
};

export const createUser = async (nickname: string): Promise<UserResponse | null> => {
  const response = await api.post<UserResponse>('/api/user/new', { nickname });

  if ('error' in response) {
    return null;
  }

  return response.data;
};

export const updateUser = async (id: string, nickname: string): Promise<UserResponse | null> => {
  const response = await api.patch<UserResponse>(`/api/user/update/${id}`, { nickname });

  if ('error' in response) {
    return null;
  }

  return response.data;
};
