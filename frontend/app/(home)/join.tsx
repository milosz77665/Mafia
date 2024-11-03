import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { router } from 'expo-router';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface JoinProps {}
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

  backView: {
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1,
  },
  backButton: {},
});
const Join: FC<JoinProps> = () => {
  return (
    <View style={style.joinContainer}>
      <View>
        <CustomText style={style.titleText}>Join Game</CustomText>
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
export default Join;
