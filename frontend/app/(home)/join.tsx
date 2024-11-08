import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { colors } from '@/constants/colors';
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

  titleText: {
    fontSize: 50,
  },

  label: {
    fontSize: 20,
    fontFamily: 'Arial',
  },

  gameIdContainer: {
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  inputContainer: {
    marginTop: 10,
    height: 40,
    width: 120,
  },
  input: {
    textAlign: 'auto',
    height: 35,
    fontSize: 24,
    fontFamily: 'Arial',
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
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={style.joinContainer}>
      <View>
        <CustomText style={style.titleText}>Join Game</CustomText>
      </View>

      <View style={style.gameIdContainer}>
        <CustomText style={style.label}> Game ID</CustomText>
        <CustomInput
          containerStyle={style.inputContainer}
          inputStyle={style.input}
          value={text}
          placeholder="#2137"
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton disabled={text === ''} onPress={() => {}}>
          Search
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
