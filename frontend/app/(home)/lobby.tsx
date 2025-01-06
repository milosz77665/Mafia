import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import PlayerCard from '@/components/PlayerCard';
import { router } from 'expo-router';
import { StyleSheet, View, FlatList } from 'react-native';
import { useState } from 'react';
import { colors } from '@/constants/colors';

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

  mainPlayerContainer: {
    marginTop: 10,
    width: '100%',
  },

  playerListContainer: {
    width: '100%',
    flex: 1,
    maxHeight: 290,
  },

  playerList: {
    width: '100%',
    paddingHorizontal: 20,
  },

  playerCard: {
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
  },

  highlightedPlayerCard: {},

  buttonsContainer: {
    marginTop: 0,
    width: 160,
  },

  startButton: {
    marginTop: 20,
  },

  backButton: {
    marginTop: 30,
  },
});

const Lobby = () => {
  const [players, setPlayers] = useState([
    { id: 'myId1', nickname: 'myName1', avatarUrl: 'https://dummyimage.com/40x40/8B0000/fff.png&text=Me' },
    { id: 'testId2', nickname: 'testName2', avatarUrl: 'https://dummyimage.com/40x40/0047AB/fff.png&text=Player2' },
    { id: 'testId3', nickname: 'testName3', avatarUrl: 'https://dummyimage.com/40x40/006400/fff.png&text=Player3' },
    { id: 'testId4', nickname: 'testName4', avatarUrl: 'https://dummyimage.com/40x40/0a14a3/fceffc.png&text=Player4' },
    { id: 'testId5', nickname: 'testName5', avatarUrl: 'https://dummyimage.com/40x40/ff4b33/fff.png&text=Player5' },
    { id: 'testId6', nickname: 'testName6', avatarUrl: 'https://dummyimage.com/40x40/f24bf2/fff.png&text=Player6' },
    { id: 'testId7', nickname: 'testName7', avatarUrl: 'https://dummyimage.com/40x40/800080/fff.png&text=Player7' },
    { id: 'testId8', nickname: 'testName8', avatarUrl: 'https://dummyimage.com/40x40/c76e00/fff.png&text=Player8' },
  ]);

  const playerCount = players.length;

  const currentUser = players.find((player) => player.id === 'myId1');

  return (
    <View style={style.lobbyContainer}>
      <CustomText style={style.titleText}>Lobby {playerCount}/8</CustomText>

      <CustomText style={style.lobbyCodeLabel}>Your lobby code:</CustomText>

      <CustomText style={style.lobbyCodeText}>69420</CustomText>

      <View style={style.mainPlayerContainer}>
        {currentUser && (
          <FlatList
            data={players.filter((player) => player.id == 'myId1')}
            keyExtractor={(item) => item.id}
            contentContainerStyle={style.playerList}
            renderItem={({ item }) => (
              <PlayerCard avatarUrl={item.avatarUrl} nickName={item.nickname} playerCardStyle={style.playerCard} />
            )}
          />
        )}
      </View>
      <View style={style.playerListContainer}>
        <FlatList
          data={players.filter((player) => player.id !== 'myId1')}
          keyExtractor={(item) => item.id}
          contentContainerStyle={style.playerList}
          renderItem={({ item }) => <PlayerCard avatarUrl={item.avatarUrl} nickName={item.nickname} />}
        />
      </View>

      <View style={style.buttonsContainer}>
        <CustomButton
          buttonStyle={style.startButton}
          onPress={() => {
            console.log('Start Game');
          }}
        >
          Start Game
        </CustomButton>

        <CustomButton
          buttonStyle={style.backButton}
          onPress={() => {
            router.replace('/');
          }}
        >
          Leave
        </CustomButton>
      </View>
    </View>
  );
};

export default Lobby;
