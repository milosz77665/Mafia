import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MusicOnOffButton from '@/components/MusicOnOffButton';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from '@/redux/reducers/userReducer';
import { getFromStorage } from '@/storage/storageHandler';

const style = StyleSheet.create({
  settingsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    paddingRight: 20,
    paddingTop: 40,
  },
});

const HomeLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      const nickname = await getFromStorage('nickname');
      const id = await getFromStorage('id');
      const avatar = await getFromStorage('avatar');

      if (nickname) {
        dispatch(userActions.setNickname(nickname));
        dispatch(userActions.resetIsNicknameChanged());
      }

      if (id) {
        dispatch(userActions.setId(id));
      }

      if (avatar) {
        dispatch(userActions.setAvatar(`${process.env.EXPO_PUBLIC_API_URL}${avatar}`));
        dispatch(userActions.resetIsAvatarChanged());
      }
    };

    loadUserData();
  }, [dispatch]);

  return (
    <>
      <View style={style.settingsContainer}>
        <MusicOnOffButton />
      </View>
      <Slot />
    </>
  );
};

export default HomeLayout;
