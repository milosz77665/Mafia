import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import PlayerCard from '@/components/PlayerCard';
import { router } from 'expo-router';
import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '@/constants/colors';
import CheckIcon from '@/assets/icons/CheckIcon';
import CrossIcon from '@/assets/icons/CrossIcon';
import HostIcon from '@/assets/icons/HostIcon';
import {
  leaveLobby,
  notReady,
  offPlayerJoined,
  offPlayerLeft,
  offPlayerReady,
  offRolesAssigned,
  onPlayerJoined,
  onPlayerLeft,
  onPlayerReady,
  onRolesAssigned,
  ready,
  startGame,
} from '@/api/lobbyApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IUser } from '@/interfaces/IUser';
import { isUserObject } from '@/utils/typeGuards';
import { gameActions } from '@/redux/reducers/gameReducer';
import { useSocketErrorHandler } from '@/hooks/useSocketErrorHandler';

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

  currentUserContainer: {
    paddingHorizontal: 19,
    width: '100%',
    height: 60,
  },

  playerListContainer: {
    width: '100%',
    flex: 1,
  },

  playerList: {
    width: '100%',
    paddingHorizontal: 20,
  },

  playerCard: {
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
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
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const handleStartGame = async () => {
    try {
      if (lobby) {
        const data = startGame(lobby.roomId);
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
        setCurrentUser((prevUser) => (prevUser ? { ...prevUser, isReady: !prevUser.isReady } : prevUser));
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
    if (lobby && id) {
      const foundUser = lobby.players.find((player): player is IUser => isUserObject(player) && player._id === id);
      setCurrentUser(foundUser || null);
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
      dispatch(gameActions.updateIsReady(data.playerId));
      console.log(data);
    });
    onRolesAssigned((data) => {
      dispatch(gameActions.updatePlayers(data.players));
      console.log(data);
    });

    return () => {
      offPlayerJoined();
      offPlayerLeft();
      offPlayerReady();
      offRolesAssigned();
    };
  }, [lobby, id]);

  return (
    <View style={style.lobbyContainer}>
      <CustomText style={style.titleText}>
        Lobby {lobby?.players.length}/{lobby?.maxPlayers}
      </CustomText>
      <CustomText style={style.lobbyCodeLabel}>Your lobby code:</CustomText>
      <CustomText style={style.lobbyCodeText}>{lobby?.roomId}</CustomText>
      <View style={style.currentUserContainer}>
        {currentUser && (
          <PlayerCard
            avatarUrl={currentUser.avatarUrl}
            icon={currentUser.isHost ? <HostIcon /> : currentUser.isReady ? <CheckIcon /> : <CrossIcon />}
            nickname={currentUser.nickname}
            playerCardStyle={style.playerCard}
          />
        )}
      </View>

      <View style={style.playerListContainer}>
        {lobby && (
          <FlatList
            data={lobby.players.filter((player): player is IUser => isUserObject(player) && player._id !== id)}
            keyExtractor={(item) => item._id}
            contentContainerStyle={style.playerList}
            renderItem={({ item }) => (
              <PlayerCard
                avatarUrl={item.avatarUrl}
                icon={item.isHost ? <HostIcon /> : item.isReady ? <CheckIcon /> : <CrossIcon />}
                nickname={item.nickname}
              />
            )}
          />
        )}
      </View>

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
