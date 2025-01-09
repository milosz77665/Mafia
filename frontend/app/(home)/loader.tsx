import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { colors } from '@/constants/colors';
import CustomLoader from '@/components/CustomLoader';

const style = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  buttonsContainer: {
    marginTop: 160,
    width: 160,
  },

  backButton: {},
});

const LoaderScreen = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={style.loaderContainer}>
      <View>
        <CustomLoader loading size="large" color={colors.black} />
      </View>
      <View style={style.buttonsContainer}>
        <CustomButton
          buttonStyle={style.backButton}
          onPress={() => {
            router.replace('/');
          }}
        >
          Cancel
        </CustomButton>
      </View>
    </View>
  );
};

export default LoaderScreen;
