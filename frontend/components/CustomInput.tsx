import { FC } from 'react';
import { StyleSheet, TextInput, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { colors } from '@/constants/colors';

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    maxWidth: 200,
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
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomInput;
