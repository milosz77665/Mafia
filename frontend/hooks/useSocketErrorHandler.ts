import { useDispatch } from 'react-redux';
import { errorActions } from '@/redux/reducers/errorReducer';
import { lobbyResponse } from '@/api/lobbyApi';
import { removeFromStorage } from '@/storage/storageHandler';
import { userActions } from '@/redux/reducers/userReducer';

export const useSocketErrorHandler = () => {
  const dispatch = useDispatch();

  const handleSocketError = (error: unknown) => {
    const response = error as lobbyResponse;

    if (response.message === 'User does not exist') {
      removeFromStorage('id');
      dispatch(userActions.setId(''));
    }

    dispatch(
      errorActions.showError({
        id: Date.now().toString(),
        title: `Error:`,
        message: response.message || 'Unexpected error occurred',
      })
    );
  };

  return { handleSocketError };
};
