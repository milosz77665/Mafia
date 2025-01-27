import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import CustomInput from '@/components/CustomInput';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useNicknameHandler } from '@/hooks/useNicknameHandler';
import { useUserDataManager } from '@/hooks/useUserDataManager';
import socketApi from '@/api/socketApi';
import { joinLobby } from '@/api/lobbyApi';
import { useDispatch } from 'react-redux';
import { gameActions } from '@/redux/reducers/gameReducer';
import { useSocketErrorHandler } from '@/hooks/useSocketErrorHandler';
import AvatarPicker from '@/components/AvatarPicker';
import Loader from '@/components/Loader';

const style = StyleSheet.create({
  joinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },

  userContainer: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  nickInputContainer: {
    marginTop: 20,
    height: 40,
    minWidth: 120,
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
    marginTop: 25,
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
    marginTop: 70,
    width: 143,
  },

  backButton: {
    marginTop: 40,
  },
});

const Join = () => {
  const dispatch = useDispatch();
  const { handleSocketError } = useSocketErrorHandler();
  const { nickname, handleNicknameChange } = useNicknameHandler();
  const { manageUserData } = useUserDataManager();
  const [gameId, setGameId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleJoin = async () => {
    setIsLoading(true); 
    const id = await manageUserData(nickname);
    if (!id) {
      setIsLoading(false); 
      return;
    }

    try {
      socketApi.connect();
      const data = await joinLobby(id, gameId);

      if (data.lobby) {
        dispatch(gameActions.setLobby(data.lobby));
      }
      router.replace('/lobby');
 
    } catch (error) {
      setIsLoading(false)
      handleSocketError(error);
    }
  };

  if (isLoading) {
    return <Loader message="Joining game..." />;
  }

  return (
    <View style={style.joinContainer}>
      <View>
        <CustomText style={style.titleText}>Join Game</CustomText>
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

      <View style={style.userContainer}>
        <AvatarPicker />
        <CustomInput
          containerStyle={style.nickInputContainer}
          inputStyle={style.nickInput}
          value={nickname}
          onChangeText={handleNicknameChange}
          maxLength={12}
        />
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton disabled={gameId === '' || nickname === ''} onPress={handleJoin}>
          Join
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
