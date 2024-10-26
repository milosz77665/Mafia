import { colors } from '@/constants/colors';
import { FC, ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface CustomTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const CustomText: FC<CustomTextProps> = ({ children, style }) => {
  return <Text style={[{ fontFamily: 'Lora', color: colors.black }, style]}>{children}</Text>;
};

export default CustomText;
