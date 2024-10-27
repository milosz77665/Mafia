import { colors } from '@/constants/colors';
import store from '@/store';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AutoplayMusic from '@/components/AutoplayMusic';

SplashScreen.preventAutoHideAsync();

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
});

const RootLayout = () => {
  const [loaded, error] = useFonts({
    'Lora': require('../assets/fonts/Lora-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <AutoplayMusic />
      <View style={style.mainContainer}>
        <Slot />
      </View>
    </Provider>
  );
};

export default RootLayout;
