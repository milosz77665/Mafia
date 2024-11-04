import { colors } from '@/constants/colors';
import { FC, ReactNode } from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import CustomText from './CustomText';

const style = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: colors.grey,
  },

  text: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },

  disabledButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: colors.disabledGrey,
  },

  disabledText: {
    color: colors.white,
  },
});

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, children, buttonStyle, textStyle, disabled }) => {
  return (
    <Pressable
      style={[style.button, buttonStyle, disabled && style.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText style={[style.text, textStyle, disabled && style.disabledText]}>{children}</CustomText>
    </Pressable>
  );
};

export default CustomButton;
