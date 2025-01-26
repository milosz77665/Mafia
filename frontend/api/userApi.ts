import api from './api';

type UserResponse = {
  id: string;
  nickname: string;
  avatarUrl: string;
};

export const createUser = async ({
  nickname,
  avatar,
}: {
  nickname: string;
  avatar: string;
}): Promise<UserResponse | null> => {
  try {
    const response = await api.post<UserResponse>('/users', { nickname, avatar });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateUser = async ({
  id,
  nickname,
  avatar,
}: {
  id: string;
  nickname: string;
  avatar: string;
}): Promise<UserResponse | null> => {
  try {
    const response = await api.patch<UserResponse>(`/users/${id}`, { nickname, avatar });
    return response.data;
  } catch (error) {
    return null;
  }
};
