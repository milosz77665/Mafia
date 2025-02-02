import { colors } from '@/constants/colors';
import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface UncheckedCheckboxIconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const UncheckedCheckboxIcon: FC<UncheckedCheckboxIconProps> = ({ color = colors.black, size = 32, style }) => {
  return (
    <View style={style}>
      <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
        <Path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM208,208H48V48H208V208Z" />
      </Svg>
    </View>
  );
};

export default UncheckedCheckboxIcon;
