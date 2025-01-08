import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { errorActions } from '@/redux/reducers/errorReducer';
import { AxiosInstance, AxiosError } from 'axios';

interface ApiErrorData {
  error: string;
  message: string;
}

export const useApiErrorHandler = (api: AxiosInstance) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorData>) => {
        if (error.response) {
          const { error: title, message } = error.response.data;

          dispatch(
            errorActions.showError({
              id: Date.now().toString(),
              title: title || `Error ${error.response.status}`,
              message: message || error.response.statusText || 'Unexpected error occurred',
            })
          );
        } else {
          dispatch(
            errorActions.showError({
              id: Date.now().toString(),
              title: 'Network Error',
              message: 'Please check your internet connection.',
            })
          );
        }

        return error.response?.data;
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [api, dispatch]);
};
