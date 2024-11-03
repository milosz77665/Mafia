import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

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

  buttonsContainer: {
    marginTop: 420,
  },
});

const Join = () => {
  return (
    <View style={style.joinContainer}>
      <View>
        <CustomText style={style.titleText}>Join Game</CustomText>
      </View>
      <View style={style.buttonsContainer}>
        <CustomButton
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
