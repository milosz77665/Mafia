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
    const loadNickname = async () => {
      const nickname = await getFromStorage('nickname');

      if (nickname) {
        dispatch(userActions.setNickname(nickname));
      }
    };

    loadNickname();
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
