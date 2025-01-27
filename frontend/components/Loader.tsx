import React, { FC } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import { colors } from '@/constants/colors';

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

interface LoaderProps {
  loading: boolean;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  loaderContainerStyle?: StyleProp<ViewStyle>;
  loaderTextStyle?: StyleProp<TextStyle>;
}

const Loader: FC<LoaderProps> = ({
  loading,
  size = 'large',
  color = colors.grey,
  message,
  loaderContainerStyle,
  loaderTextStyle,
}) => {
  return (
    <View style={[style.loaderContainer, loaderContainerStyle]}>
      <ActivityIndicator size={size} color={color} />
      {message && <CustomText style={[style.loaderText, loaderTextStyle]}>{message}</CustomText>}
    </View>
  );
};

export default Loader;
