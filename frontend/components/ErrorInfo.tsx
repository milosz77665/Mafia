import { FC } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { colors } from '@/constants/colors';
import { MotiView } from 'moti';

const style = StyleSheet.create({
  errorContainer: {
    borderRadius: 3,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colors.errorRed,
  },

  text: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: colors.errorWhite,
  },
});

interface ErrorInfoProps {
  index: number;
  title: string;
  message: string;
}

const ErrorInfo: FC<ErrorInfoProps> = ({ index, title, message }) => {
  return (
    <MotiView
      from={{ translateY: `-${200 * (index + 1)}%` }}
      animate={{ translateY: 0 }}
      exit={{ translateY: `-${200 * (index + 1)}%` }}
      transition={{
        type: 'timing',
        duration: 350,
      }}
      style={style.errorContainer}
    >
      <CustomText style={style.text}>{title}</CustomText>
      <CustomText style={style.text}>{message}</CustomText>
    </MotiView>
  );
};

export default ErrorInfo;
