import { colors } from '@/constants/colors';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

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
    <View style={style.mainContainer}>
      <Slot />
    </View>
  );
};

export default RootLayout;
