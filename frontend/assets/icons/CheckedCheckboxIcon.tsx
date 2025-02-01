import { colors } from '@/constants/colors';
import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface CheckedCheckboxIconProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CheckedCheckboxIcon: FC<CheckedCheckboxIconProps> = ({ color = colors.black, size = 32, style }) => {
  return (
    <View style={style}>
      <Svg width={size} height={size} fill={color} viewBox="0 0 256 256">
        <Path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z"></Path>
      </Svg>
    </View>
  );
};

export default CheckedCheckboxIcon;
