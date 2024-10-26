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
  },
});

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, children, buttonStyle, textStyle }) => {
  return (
    <Pressable style={[style.button, buttonStyle]} onPress={onPress}>
      <CustomText style={[style.text, textStyle]}>{children}</CustomText>
    </Pressable>
  );
};

export default CustomButton;
