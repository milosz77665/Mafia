import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { userActions } from '@/redux/reducers/userReducer';
import { saveInStorage } from '@/storage/storageHandler';
import { RootState } from '@/redux/store';

export const useNicknameHandler = () => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const dispatch = useDispatch();

  const debouncedSaveNickname = useMemo(() => {
    return debounce((newNickname: string) => {
      saveInStorage('nickname', newNickname);
    }, 500);
  }, []);

  const handleNicknameChange = async (newNickname: string) => {
    newNickname = newNickname.trim();
    if (newNickname !== nickname) {
      dispatch(userActions.setNickname(newNickname));
      if (newNickname.length > 0) {
        debouncedSaveNickname(newNickname);
      }
    }
  };

  useEffect(() => {
    return () => {
      debouncedSaveNickname.cancel();
    };
  }, [debouncedSaveNickname]);

  return { nickname, handleNicknameChange };
};
