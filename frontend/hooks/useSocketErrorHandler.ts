import { useDispatch } from 'react-redux';
import { errorActions } from '@/redux/reducers/errorReducer';
import { lobbyResponse } from '@/api/lobbyApi';

export const useSocketErrorHandler = () => {
  const dispatch = useDispatch();

  const handleSocketError = (error: unknown) => {
    const response = error as lobbyResponse;
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
