import store from '@/redux/store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AutoplayMusic from '@/components/AutoplayMusic';
import { ReduceMotion, ReducedMotionConfig } from 'react-native-reanimated';
import 'react-native-gesture-handler';
import Errors from '@/components/Errors';
import MainContainer from '@/components/MainContainer';
import { Slot } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    'Lora': require('../assets/fonts/Lora-Regular.ttf'),
    'Arial': require('../assets/fonts/ArialTh.ttf'),
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
      <ReducedMotionConfig mode={ReduceMotion.Never} />
      <AutoplayMusic />
      <MainContainer>
        <Errors />
        <Slot />
      </MainContainer>
    </Provider>
  );
};

export default RootLayout;
