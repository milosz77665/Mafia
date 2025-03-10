import { ImageBackground, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '@/redux/reducers/gameReducer';
import { leaveLobby, offPlayerLeft, onPlayerLeft } from '@/api/lobbyApi';
import { useSocketErrorHandler } from '@/hooks/useSocketErrorHandler';
import CustomText from '@/components/CustomText';

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
  },

  fullWidthContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 3,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  countdownLabel: {
    fontSize: 20,
  },

  countdown: {
    marginTop: 50,
    fontSize: 50,
    paddingBottom: 70,
  },

  gameCountdownLabel: {
    fontSize: 20,
    color: colors.white,
  },

  gameCountdown: {
    fontSize: 50,
    color: colors.white,
  },

  roleLabel: {
    fontSize: 50,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  mafiaRole: {
    color: colors.mafiaRed,
  },

  citizenRole: {
    color: colors.citizenGreen,
  },

  button: {
    marginTop: 170,
    maxWidth: 200,
  },
});

const RoleScreen = () => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState<number>(3);
  const [isRoleVisible, setIsRoleVisible] = useState<boolean>(false);
  const { handleSocketError } = useSocketErrorHandler();
  const lobby = useSelector((state: RootState) => state.game.lobby);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const id = useSelector((state: RootState) => state.user.id);
  const CitizenImg = require('@/assets/images/Citizen.png');
  const MafiaImg = require('@/assets/images/Mafia.png');

  useEffect(() => {
    onPlayerLeft((data) => {
      dispatch(gameActions.updatePlayers(data.players));
      console.log(data);
    });

    return () => {
      offPlayerLeft();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 1 && isRoleVisible) {
        clearInterval(interval);
      }
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          setIsRoleVisible((prevIsVisible) => {
            if (!prevIsVisible) setCountdown(5);
            return true;
          });
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  const handleLeave = async () => {
    try {
      if (lobby) {
        await leaveLobby(id, lobby.roomId);
        router.replace('/');
      }
    } catch (error) {
      handleSocketError(error);
    }
  };

  return !isRoleVisible ? (
    <View style={styles.countdownContainer}>
      <CustomText style={styles.countdownLabel}>Your role will be displayed in</CustomText>
      <CustomText style={styles.countdown}>{countdown}</CustomText>
    </View>
  ) : (
    <ImageBackground source={currentUser?.role === 'mafia' ? MafiaImg : CitizenImg} style={styles.fullScreenBackground}>
      <View style={styles.overlayContainer}>
        <View style={styles.fullWidthContainer}>
          <CustomText style={[styles.roleLabel, currentUser?.role === 'mafia' ? styles.mafiaRole : styles.citizenRole]}>
            {currentUser?.role}
          </CustomText>
        </View>
        <View style={[styles.fullWidthContainer, { marginTop: 300 }]}>
          <CustomText style={styles.gameCountdownLabel}>The game will start in</CustomText>
          <CustomText style={styles.gameCountdown}>{countdown}</CustomText>
        </View>
        <CustomButton buttonStyle={styles.button} onPress={handleLeave}>
          Leave
        </CustomButton>
      </View>
    </ImageBackground>
  );
};

export default RoleScreen;
