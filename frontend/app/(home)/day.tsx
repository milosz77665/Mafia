import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '@/constants/colors';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import Loader from '@/components/Loader';
import PlayerList from '@/components/PlayerList';
import { RootState } from '@/redux/store';
import { leaveLobby } from '@/api/lobbyApi';
import { useSocketErrorHandler } from '@/hooks/useSocketErrorHandler';

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //to sprawia że wyraźniej widać tekst
  },

  titleText: {
    fontSize: 40,
    marginTop: 20,
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
  },

  nicknameText: {
    color: colors.white
  },

  buttonsContainer: {
    width: 160,
    justifyContent: 'flex-end',
    flex: 1,
  },

  startButton: {
    marginBottom: 20,
  },

  backButton: {
    marginBottom: 30,
  },
});

const DayPhaseScreen = () => {
  const dispatch = useDispatch();
  const { handleSocketError } = useSocketErrorHandler();
  const lobby = useSelector((state: RootState) => state.game.lobby);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chosenPlayerId, setChosenPlayerId] = useState<string | undefined>(undefined);
  const DayImg = require('@/assets/images/Day_low_sat.png');

  const handlePlayerChosen = (id: string) => {
    setChosenPlayerId(id);
  };

  const handleStartGame = async () => {
    try {
      setIsProcessing(true);
      if (lobby) {
      }
    } catch (error) {
      handleSocketError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeave = async () => {
    try {
      if (lobby && currentUser) {
        await leaveLobby(currentUser._id, lobby.roomId);
        router.replace('/');
      }
    } catch (error) {
      handleSocketError(error);
    }
  };

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  if (isProcessing) {
    return (
      <View style={styles.overlayContainer}>
        <Loader message="Loading..." />
      </View>
    );
  }

  return (
    <ImageBackground source={DayImg} style={styles.fullScreenBackground}>
      <View style={styles.overlayContainer}>
        <CustomText style={styles.titleText}>Day Faze</CustomText>

        {lobby && currentUser && (
          <PlayerList
            lobby={lobby}
            currentUser={currentUser}
            isGameStarted={true}
            onPlayerChosen={handlePlayerChosen}
            chosenPlayerId={chosenPlayerId}
            nicknameTextStyle={styles.nicknameText}
          />
        )}

        <View style={styles.buttonsContainer}>
          {currentUser?.isHost ? (
            <CustomButton buttonStyle={styles.startButton} onPress={handleStartGame}>
              End day faze
            </CustomButton>
          ) : (
            <CustomButton buttonStyle={styles.startButton} onPress={() => {}}>
              Confirm Vote
            </CustomButton>
          )}
          <CustomButton buttonStyle={styles.backButton} onPress={handleLeave}>
            Leave Game
          </CustomButton>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DayPhaseScreen;
