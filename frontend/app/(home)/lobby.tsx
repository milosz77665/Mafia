import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '@/constants/colors';
import {
  leaveLobby,
  notReady,
  offPlayerJoined,
  offPlayerLeft,
  offPlayerReady,
  offReconnectFailed,
  offRolesAssigned,
  onPlayerJoined,
  onPlayerLeft,
  onPlayerReady,
  onReconnectFailed,
  onRolesAssigned,
  ready,
  startGame,
} from '@/api/lobbyApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/interfaces/IUser';
import { gameActions } from '@/redux/reducers/gameReducer';
import { useSocketErrorHandler } from '@/hooks/useSocketErrorHandler';
import Loader from '@/components/Loader';
import PlayerList from '@/components/PlayerList';
import { userActions } from '@/redux/reducers/userReducer';
import { errorActions } from '@/redux/reducers/errorReducer';

const style = StyleSheet.create({
  lobbyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    width: '75%',
  },

  titleText: {
    fontSize: 40,
    marginTop: 20,
  },

  lobbyCodeLabel: {
    fontSize: 25,
    marginTop: 40,
  },

  lobbyCodeText: {
    fontSize: 35,
    marginTop: 10,
    color: colors.grey,
    fontWeight: 'bold',
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

const Lobby = () => {
  const dispatch = useDispatch();
  const { handleSocketError } = useSocketErrorHandler();
  const lobby = useSelector((state: RootState) => state.game.lobby);
  const id = useSelector((state: RootState) => state.user.id);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isGameStarting, setIsGameStarting] = useState<boolean>(false);

  const handleStartGame = async () => {
    try {
      if (lobby) {
        await startGame(lobby.roomId);
      }
    } catch (error) {
      handleSocketError(error);
    }
  };

  const handleReady = async () => {
    try {
      if (lobby && currentUser) {
        if (currentUser.isReady) {
          await notReady(id, lobby.roomId);
        } else {
          await ready(id, lobby.roomId);
        }
      }
    } catch (error) {
      handleSocketError(error);
    }
  };

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

  useEffect(() => {
    const updateCurrentUser = (players: IUser[], id: string) => {
      const foundUser = players.find((player) => player._id === id);
      if (foundUser) {
        dispatch(userActions.setCurrentUser(foundUser));
      } else {
        router.replace('/');
        dispatch(
          errorActions.showError({
            id: Date.now().toString(),
            title: 'User Not Found',
            message: 'User data could not be found. Please try again later',
          })
        );
      }
    };
    if (lobby && id) {
      updateCurrentUser(lobby.players, id);
    }

    onPlayerJoined((data) => {
      dispatch(gameActions.addPlayer(data.player));
      console.log(data);
    });
    onPlayerLeft((data) => {
      dispatch(gameActions.updatePlayers(data.players));
      console.log(data);
    });
    onPlayerReady((data) => {
      const { id, isReady } = data;
      dispatch(gameActions.updateIsReady({ id, isReady }));
      console.log(data);
    });
    onRolesAssigned((data) => {
      setIsGameStarting(true);
      if (lobby) {
        dispatch(
          gameActions.setLobby({
            ...lobby,
            players: data.players,
            isGameStarted: true,
          })
        );
      }
      updateCurrentUser(data.players, id);
      console.log(data);
      router.replace('/role');
    });
    onReconnectFailed(() => {
      router.replace('/');
    });

    return () => {
      offPlayerJoined();
      offPlayerLeft();
      offPlayerReady();
      offRolesAssigned();
      offReconnectFailed();
    };
  }, [lobby, id]);

  if (isGameStarting) {
    return (
      <View style={style.lobbyContainer}>
        <Loader message="Starting game..." />
      </View>
    );
  }

  return (
    <View style={style.lobbyContainer}>
      <CustomText style={style.titleText}>
        Lobby {lobby?.players.length}/{lobby?.maxPlayers}
      </CustomText>
      <CustomText style={style.lobbyCodeLabel}>Your lobby code:</CustomText>
      <CustomText style={style.lobbyCodeText}>{lobby?.roomId}</CustomText>
      {lobby && currentUser && (
        <PlayerList lobby={lobby} currentUser={currentUser} isGameStarted={lobby.isGameStarted} />
      )}

      <View style={style.buttonsContainer}>
        {currentUser?.isHost ? (
          <CustomButton buttonStyle={style.startButton} onPress={handleStartGame}>
            Start Game
          </CustomButton>
        ) : (
          <CustomButton buttonStyle={style.startButton} onPress={handleReady}>
            {currentUser?.isReady ? 'Not Ready' : 'Ready'}
          </CustomButton>
        )}
        <CustomButton buttonStyle={style.backButton} onPress={handleLeave}>
          Leave
        </CustomButton>
      </View>
    </View>
  );
};

export default Lobby;
