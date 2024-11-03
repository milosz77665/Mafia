import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import CustomSlider from '@/components/CustomSlider';
import { colors } from '@/constants/colors';
interface HostProps {}
const style = StyleSheet.create({
  hostContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },

  titleText: {
    fontSize: 50,
  },
  input: {},
  slider: { marginTop: 0, width: 220, height: 20, transform: [{ scaleY: 1.2 }] },
  gamenameView: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20,
  },
  backView: {
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'Arial',
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  backButton: {},
  civdiv: { flexDirection: 'row', marginTop: 50 },
  citLabel: { fontSize: 20, fontFamily: 'Arial', marginRight: 10 },
  mr30: { marginRight: 30 },
});

const Host: FC<HostProps> = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const changeBorderColor = (isFocused: boolean): string => {
    return isFocused ? colors.black : 'red'; // Ustawienia kolorów dla focus i blur
  };
  const [sliderValue, setSliderValue] = useState(10);
  const mafiaCount = (sliderValue: number): number => {
    if (sliderValue <= 6) return 1;
    if (sliderValue > 6 && sliderValue <= 10) return 2;
    if (sliderValue > 10 && sliderValue <= 14) return 3;

    return 4;
  };
  const citizenCount = (sliderValue: number): number => {
    if (sliderValue <= 6) return sliderValue - 1;
    if (sliderValue > 6 && sliderValue <= 10) return sliderValue - 2;
    if (sliderValue > 10 && sliderValue <= 14) return sliderValue - 3;
    return sliderValue - 4;
  };
  return (
    <View style={style.hostContainer}>
      <View>
        <CustomText style={style.titleText}>Host Game</CustomText>
      </View>
      <View style={[style.gamenameView]}>
        <CustomText style={style.label}> Game name</CustomText>
        <CustomInput
          inputStyle={[style.input, { borderColor: changeBorderColor(isFocused) }]}
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      <CustomText style={style.label}> Set lobby size</CustomText>
      <CustomText style={style.sliderLabel}>{sliderValue}</CustomText>
      <CustomSlider
        sliderStyle={style.slider}
        value={10}
        onValueChange={(value) => {
          setSliderValue(value);
        }}
        minimumValue={5}
        maximumValue={20}
        step={1}
        minimumTrackTintColor={colors.black}
        maximumTrackTintColor={colors.lightGrey}
        thumbTintColor={colors.grey}
      />
      <View style={style.civdiv}>
        <CustomText style={style.citLabel}> Citizen</CustomText>
        <CustomText style={style.citLabel}> {citizenCount(sliderValue)}</CustomText>
        <View style={style.mr30}></View>

        <CustomText style={style.citLabel}> Mafia</CustomText>
        <CustomText style={style.citLabel}> {mafiaCount(sliderValue)}</CustomText>
      </View>
      <View style={style.backView}>
        <CustomButton
          buttonStyle={style.backButton}
          onPress={() => {
            router.replace('/');
          }}
        >
          Back
        </CustomButton>
      </View>
    </View>
  );
};

export default Host;
