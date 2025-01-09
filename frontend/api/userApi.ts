import api from './api';

type UserResponse = {
  id: string;
  nickname: string;
};

export const createUser = async (nickname: string): Promise<UserResponse | null> => {
  try {
    const response = await api.post<UserResponse>('/api/user/new', { nickname });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateUser = async (id: string, nickname: string): Promise<UserResponse | null> => {
  try {
    const response = await api.patch<UserResponse>(`/api/user/update/${id}`, { nickname });
    return response.data;
  } catch (error) {
    return null;
  }
};
