import { colors } from '@/constants/colors';
import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CrossIconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CrossIcon: FC<CrossIconProps> = ({ color = colors.disabledGrey, size = 28, style }) => {
  return (
    <View style={style}>
      <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
        <Path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></Path>
      </Svg>
    </View>
  );
};

export default CrossIcon;
