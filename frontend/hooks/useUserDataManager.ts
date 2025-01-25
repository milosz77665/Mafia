import { createUser, updateUser } from '@/api/userApi';
import { userActions } from '@/redux/reducers/userReducer';
import { RootState } from '@/redux/store';
import { getFromStorage, saveInStorage } from '@/storage/storageHandler';
import { useDispatch, useSelector } from 'react-redux';

export const useUserDataManager = () => {
  const dispatch = useDispatch();
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const isAvatarChanged = useSelector((state: RootState) => state.user.isAvatarChanged);
  const isNicknameChanged = useSelector((state: RootState) => state.user.isNicknameChanged);

  const manageUserData = async (nickname: string) => {
    const id = await getFromStorage('id');
    if (!id) {
      const data = await createUser({ nickname, avatar });

      if (data) {
        dispatch(userActions.setId(data.id));
        dispatch(userActions.resetIsAvatarChanged());
        await saveInStorage('id', data.id);
        return data.id;
      } else {
        return;
      }
    } else if (isNicknameChanged || isAvatarChanged) {
      const data = await updateUser({ id, nickname, avatar });

      if (data) {
        dispatch(userActions.resetIsNicknameChanged());
        dispatch(userActions.resetIsAvatarChanged());
        return data.id;
      } else {
        return;
      }
    }
    return id;
  };
  return { manageUserData };
};
