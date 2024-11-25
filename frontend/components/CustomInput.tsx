import { FC } from 'react';
import { StyleSheet, TextInput, StyleProp, ViewStyle, TextStyle, View, KeyboardTypeOptions } from 'react-native';
import { colors } from '@/constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 25,
    padding: 2,
    borderRadius: 1,
    backgroundColor: colors.lightGrey,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    color: colors.black,
  },
});

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  maxLength,
  keyboardType,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;
