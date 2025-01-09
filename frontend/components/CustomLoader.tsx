import React, { FC } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import CustomText from './CustomText';

const style = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
  },
});

interface CustomLoaderProps {
  loading: boolean;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  loaderContainerStyle?: StyleProp<ViewStyle>;
  loaderTextStyle?: StyleProp<TextStyle>;
}

const CustomLoader: FC<CustomLoaderProps> = ({
  loading,
  size = 'large',
  color = '#000',
  message,
  loaderContainerStyle,
  loaderTextStyle,
}) => {
  if (!loading) return null;

  return (
    <View style={[style.loaderContainer, loaderContainerStyle]}>
      <ActivityIndicator size={size} color={color} />
      {message && <CustomText style={[style.loaderText, loaderTextStyle]}>{message}</CustomText>}
    </View>
  );
};

export default CustomLoader;