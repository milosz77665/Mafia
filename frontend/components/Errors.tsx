import { RootState } from '@/redux/store';
import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ErrorInfo from './ErrorInfo';
import { errorActions } from '@/redux/reducers/errorReducer';
import { AnimatePresence } from 'moti';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';
import api from '@/api/api';

const style = StyleSheet.create({
  errorsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '90%',
    maxWidth: 600,
    position: 'absolute',
    zIndex: 10,
    top: 20,
  },
});

const Errors: FC = () => {
  useApiErrorHandler(api);

  const errors = useSelector((state: RootState) => state.error.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        dispatch(errorActions.removeFirst());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errors, dispatch]);

  return (
    <View style={style.errorsContainer}>
      <AnimatePresence>
        {errors.map((error, index) => {
          return <ErrorInfo key={error.id} index={index} title={error.title} message={error.message} />;
        })}
      </AnimatePresence>
    </View>
  );
};

export default Errors;
