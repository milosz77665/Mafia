import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import MusicOnOffButton from '@/components/MusicOnOffButton';

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
