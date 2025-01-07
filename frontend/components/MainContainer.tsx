import { colors } from '@/constants/colors';
import { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
});

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return <View style={style.mainContainer}>{children}</View>;
};

export default MainContainer;
