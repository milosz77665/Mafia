import { createUser, updateUser } from '@/api/userApi';
import { userActions } from '@/redux/reducers/userReducer';
import { RootState } from '@/redux/store';
import { getFromStorage, saveInStorage } from '@/storage/storageHandler';
import { useDispatch, useSelector } from 'react-redux';

export const useUserDataManager = () => {
  const dispatch = useDispatch();
  const didNicknameChanged = useSelector((state: RootState) => state.user.didNicknameChanged);

  const manageUserData = async (nickname: string) => {
    const id = await getFromStorage('id');
    if (!id) {
      const data = await createUser(nickname);

      if (data) {
        dispatch(userActions.setId(data.id));
        await saveInStorage('id', data.id);
      }
    } else if (didNicknameChanged) {
      await updateUser(id, nickname);
    }
  };
  return { manageUserData };
};
