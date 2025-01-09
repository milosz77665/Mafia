import { colors } from '@/constants/colors';
import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CheckIcon: FC<CheckIconProps> = ({ color = colors.disabledGrey, size = 28, style }) => {
  return (
    <View style={style}>
      <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
        <Path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></Path>
      </Svg>
    </View>
  );
};

export default CheckIcon;
