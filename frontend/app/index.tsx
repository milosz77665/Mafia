import HatIcon from '@/assets/icons/HatIcon';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  indexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },

  header: {
    fontSize: 50,
  },

  buttonsContainer: {
    marginTop: 175,
  },

  joinGameButton: {
    marginTop: 40,
  },
});

const Index = () => {
  return (
    <View style={style.indexContainer}>
      <HatIcon width={170} height={80} />
      <CustomText style={style.header}>Mafia</CustomText>
      <View style={style.buttonsContainer}>
        <CustomButton onPress={() => {}}>Host Game</CustomButton>
        <CustomButton onPress={() => {}} buttonStyle={style.joinGameButton}>
          Join Game
        </CustomButton>
      </View>
    </View>
  );
};

export default Index;
