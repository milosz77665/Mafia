import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import CustomSlider from '@/components/CustomSlider';
import { colors } from '@/constants/colors';
import { useNicknameHandler } from '@/hooks/useNicknameHandler';

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

  nickContainer: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  nickInputContainer: {
    marginTop: 10,
    height: 40,
    minWidth: 120,
  },

  nickInput: {
    textAlign: 'center',
    height: 35,
    fontSize: 20,
    fontFamily: 'Arial',
    width: 160,
  },

  lobbySizeContainer: {
    marginTop: 60,
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

  sliderContainer: {
    marginTop: 10,
  },

  slider: {
    width: 220,
    height: 20,
    transform: [{ scaleY: 1.2 }],
  },

  sliderCurrentNumber: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },

  ratioInfoContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },

  citizensNumber: {
    fontWeight: 'bold',
    marginRight: 30,
  },

  mafiaNumber: {
    fontWeight: 'bold',
  },

  buttonsContainer: {
    marginTop: 100,
  },

  backButton: {
    marginTop: 30,
  },
});

const Host = () => {
  const { nickname, handleNicknameChange } = useNicknameHandler();
  const [sliderValue, setSliderValue] = useState<number>(10);

  const getNumberOfMafia = (numberOfPlayers: number): number => {
    return Math.round(Math.sqrt(numberOfPlayers) / 2);
  };

  return (
    <View style={style.hostContainer}>
      <View>
        <CustomText style={style.titleText}>Host Game</CustomText>
      </View>

      <View style={style.nickContainer}>
        <CustomText style={style.label}>Your nickname</CustomText>
        <CustomInput
          containerStyle={style.nickInputContainer}
          inputStyle={style.nickInput}
          value={nickname}
          onChangeText={handleNicknameChange}
          maxLength={12}
        />
      </View>

      <View style={style.lobbySizeContainer}>
        <CustomText style={style.label}>Set lobby size</CustomText>
        <CustomText style={style.sliderCurrentNumber}>{sliderValue}</CustomText>
        <CustomSlider
          sliderStyle={style.slider}
          sliderContainerStyle={style.sliderContainer}
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value);
          }}
          minimumValue={6}
          maximumValue={20}
          step={1}
          minimumTrackTintColor={colors.black}
          maximumTrackTintColor={colors.lightGrey}
          thumbTintColor={colors.grey}
        />
      </View>

      <View style={style.ratioInfoContainer}>
        <CustomText style={style.label}>Citizens: </CustomText>
        <CustomText style={[style.label, style.citizensNumber]}>
          {sliderValue - getNumberOfMafia(sliderValue)}
        </CustomText>
        <CustomText style={style.label}>Mafia: </CustomText>
        <CustomText style={[style.label, style.mafiaNumber]}>{getNumberOfMafia(sliderValue)}</CustomText>
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton disabled={nickname === ''} onPress={() => {}}>
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
