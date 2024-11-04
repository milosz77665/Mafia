import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import CustomSlider from '@/components/CustomSlider';
import { colors } from '@/constants/colors';

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

  label: {
    fontSize: 20,
    fontFamily: 'Arial',
  },

  gameNameContainer: {
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  input: {
    marginTop: 10,
  },

  lobbySizeContainer: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  sliderLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },

  slider: {
    width: 220,
    height: 20,
    transform: [{ scaleY: 1.2 }],
  },

  sliderCurrentNumber: {
    marginTop: 10,
  },

  ratioInfoContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },

  citizensNumber: {
    marginRight: 30,
  },

  buttonsContainer: {
    marginTop: 100,
  },

  backButton: {
    marginTop: 30,
  },
});

const Host = () => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(10);

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

      <View style={style.gameNameContainer}>
        <CustomText style={style.label}>Game name</CustomText>
        <CustomInput
          containerStyle={style.input}
          inputStyle={{ borderColor: isFocused ? colors.black : 'red' }}
          value={text}
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      <View style={style.lobbySizeContainer}>
        <CustomText style={style.label}>Set lobby size</CustomText>
        <CustomText style={style.sliderCurrentNumber}>{sliderValue}</CustomText>
        <CustomSlider
          sliderStyle={style.slider}
          value={sliderValue}
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
      </View>

      <View style={style.ratioInfoContainer}>
        <CustomText style={style.label}>Citizens: </CustomText>
        <CustomText style={[style.label, style.citizensNumber]}>{citizenCount(sliderValue)}</CustomText>

        <CustomText style={style.label}>Mafia: </CustomText>
        <CustomText style={style.label}>{mafiaCount(sliderValue)}</CustomText>
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton disabled={text === ''} onPress={() => {}}>
          Create Lobby
        </CustomButton>
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
