import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

const style = StyleSheet.create({
  joinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
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
    minWidth: 120
  },
  nickInput: {
    textAlign: 'center',
    height: 35,
    fontSize: 24,
    fontFamily: 'Arial',
    width: 160,
  },
  titleText: {
    fontSize: 50,
  },

  label: {
    fontSize: 20,
    fontFamily: 'Arial',
  },

  gameIdContainer: {
    marginTop: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  gameIdInputContainer: {
    marginTop: 10,
    height: 40,
  },

  gameIdInput: {
    textAlign: 'center',
    height: 35,
    fontSize: 24,
    fontFamily: 'Arial',
    width: 100,
  },

  buttonsContainer: {
    marginTop: 210,
    width: 143,
  },

  backButton: {
    marginTop: 40,
  },
});

const Join = () => {
  const [nickname, setNickname] = useState<string>('SillyGoose17');
  const [gameId, setGameId] = useState<string>('');


  return (
    <View style={style.joinContainer}>
      <View>
        <CustomText style={style.titleText}>Join Game</CustomText>
      </View>
      <View style={style.nickContainer}>
        <CustomText style={style.label}>Your nickname</CustomText>
        <CustomInput
          containerStyle={style.nickInputContainer}
          inputStyle={style.nickInput}
          value={nickname}
          onChangeText={setNickname}
          maxLength={12}
        />
      </View>

      <View style={style.gameIdContainer}>
        <CustomText style={style.label}>Game ID</CustomText>
        <CustomInput
          containerStyle={style.gameIdInputContainer}
          inputStyle={style.gameIdInput}
          value={gameId}
          placeholder="12345"
          onChangeText={(value) => {
            setGameId(value.replace(/[^0-9#]/g, ''));
          }}
          maxLength={5}
          keyboardType="numeric"
        />
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton disabled={gameId === ''} onPress={() => {}}>
          Continue
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

export default Join;
