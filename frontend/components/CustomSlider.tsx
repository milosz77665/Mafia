import Slider from '@react-native-community/slider';
import { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import CustomText from './CustomText';

const style = StyleSheet.create({
  slider: {
    width: '100%',
    height: 30,
    marginHorizontal: 10,
  },

  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  sliderStyle?: StyleProp<TextStyle>;
  sliderContainerStyle?: StyleProp<TextStyle>;
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
  sliderContainerStyle,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
}) => {
  return (
    <View style={[style.sliderContainer, sliderContainerStyle]}>
      <CustomText>{minimumValue}</CustomText>
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
      <CustomText>{maximumValue}</CustomText>
    </View>
  );
};

export default CustomSlider;
