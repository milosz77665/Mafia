import Slider from '@react-native-community/slider';
import { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

const style = StyleSheet.create({
  slider: {
    width: '100%',
    height: 30,
  },
});
interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  sliderStyle?: StyleProp<TextStyle>;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
  thumbTintColor: string;
}

const CustomSlider: FC<CustomSliderProps> = ({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step,
  sliderStyle,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
}) => {
  return (
    <Slider
      style={[style.slider, sliderStyle]}
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
    />
  );
};

export default CustomSlider;
