import { ImageBackground, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { IUser } from '@/interfaces/IUser';
import { RootState } from '@/redux/store';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '@/redux/reducers/gameReducer';
import { isUserObject } from '@/utils/typeGuards';
import {
  leaveLobby,
  offPlayerLeft,
  offRolesAssigned,
  onPlayerLeft,
  onRolesAssigned,
} from '@/api/lobbyApi';
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  roleLabel: {
    fontSize: 50,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.85,
  },

  mafiaRole: {
    color: colors.mafiaRed,
  },

  citizenRole: {
    color: colors.citizenGreen,
  },

  button: {
    marginTop: 220,
    maxWidth: 200,
  },
});

const RoleScreen = () => {
  const dispatch = useDispatch();
  const { handleSocketError } = useSocketErrorHandler();
  const lobby = useSelector((state: RootState) => state.game.lobby);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const CitizenImg = require('@/assets/images/Citizen.png');
  const MafiaImg = require('@/assets/images/Mafia.png');
  const id = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (lobby && id) {
      const foundUser = lobby.players.find((player): player is IUser => isUserObject(player) && player._id === id);
      setCurrentUser(foundUser || null);
    }
    onPlayerLeft((data) => {
      dispatch(gameActions.updatePlayers(data.players));
      console.log(data);
    });
    onRolesAssigned((data) => {
      dispatch(gameActions.updatePlayers(data.players));
      console.log(data);
    });

    return () => {
      offPlayerLeft();
      offRolesAssigned();
    };
  }, [lobby, id]);

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

  return (
    <ImageBackground source={currentUser?.role === 'mafia' ? MafiaImg : CitizenImg} style={styles.fullScreenBackground}>
      <View style={styles.overlayContainer}>
        <CustomText style={[styles.roleLabel, currentUser?.role === 'mafia' ? styles.mafiaRole : styles.citizenRole]}>
          {currentUser?.role}
        </CustomText>
        <CustomButton buttonStyle={styles.button} onPress={handleLeave}>
          Leave
        </CustomButton>
      </View>
    </ImageBackground>
  );
};

export default RoleScreen;
