import { FC } from 'react';
import { FlatList, View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import PlayerCard from './PlayerCard';
import CheckIcon from '@/assets/icons/CheckIcon';
import HostIcon from '@/assets/icons/HostIcon';
import CrossIcon from '@/assets/icons/CrossIcon';
import { IUser } from '@/interfaces/IUser';
import { ILobby } from '@/interfaces/ILobby';
import { isUserObject } from '@/utils/typeGuards';
import { colors } from '@/constants/colors';
import Checkbox from './Checkbox';

const style = StyleSheet.create({
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

  playerCardContainer: {
    flexDirection: 'row',
  },

  playerCard: {
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
  },
});

interface PlayerListProps {
  lobby: ILobby;
  currentUser: IUser;
  isGameStarted: boolean;
  onPlayerChosen?: (id: string) => void;
  chosenPlayerId?: string;
  nicknameTextStyle?: StyleProp<TextStyle>;
}

const PlayerList: FC<PlayerListProps> = ({ lobby, currentUser, isGameStarted, onPlayerChosen, chosenPlayerId, nicknameTextStyle }) => {
  return (
    <>
      <View style={style.currentUserContainer}>
        {currentUser && (
          <PlayerCard
            avatarUrl={currentUser.avatarUrl}
            rightElement={
              !isGameStarted &&
              (currentUser.isHost ? <HostIcon /> : currentUser.isReady ? <CheckIcon /> : <CrossIcon />)
            }
            nickname={currentUser.nickname}
            playerCardStyle={style.playerCard}
            nicknameTextStyle = {nicknameTextStyle}
          />
        )}
      </View>

      <View style={style.playerListContainer}>
        {lobby && (
          <FlatList
            data={lobby.players.filter(
              (player): player is IUser => isUserObject(player) && player._id !== currentUser._id
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={style.playerList}
            renderItem={({ item }) => (
              <PlayerCard
                leftElement={
                  isGameStarted &&
                  onPlayerChosen && (
                    <Checkbox
                      isChecked={item._id === chosenPlayerId}
                      checkboxId={item._id}
                      onCheckboxChange={onPlayerChosen}
                    />
                  )
                }
                avatarUrl={item.avatarUrl}
                rightElement={
                  !isGameStarted && (item.isHost ? <HostIcon /> : item.isReady ? <CheckIcon /> : <CrossIcon />)
                }
                nickname={item.nickname}
              />
            )}
          />
        )}
      </View>
    </>
  );
};

export default PlayerList;
