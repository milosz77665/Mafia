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
    width: '75%'
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

  playerListContainer: {
    marginTop: 40,
    width: '100%',
    flex: 1,
  },

  //   playerItem: {
  //     fontSize: 20,
  //     padding: 10,
  //   },

  playerList: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  
  buttonsContainer: {
    marginBottom: 200,
    width: 200,
  },

  startButton: {
    marginTop: 20,
  },

  backButton: {
    marginTop: 20,
  },
});

const Lobby = () => {
  const [players, setPlayers] = useState([
    { id: 'testId', nickname: 'testName1', avatarUrl: 'https://dummyimage.com/40x40/424241/fceffc.png&text=Player1' },
    { id: 'testId2', nickname: 'testName2', avatarUrl: 'https://dummyimage.com/40x40/0a14a3/fff.png&text=Player2' },
    { id: 'testId3', nickname: 'testName3', avatarUrl: 'https://dummyimage.com/40x40/f24bf2/fff.png&text=Player3' },
    { id: 'testId4', nickname: 'testName1', avatarUrl: 'https://dummyimage.com/40x40/424241/fceffc.png&text=Player4' },
    { id: 'testId5', nickname: 'testName2', avatarUrl: 'https://dummyimage.com/40x40/0a14a3/fff.png&text=Player5' },
    { id: 'testId6', nickname: 'testName3', avatarUrl: 'https://dummyimage.com/40x40/f24bf2/fff.png&text=Player6' },
  ]);

  const playerCount = players.length;

  return (
    <View style={style.lobbyContainer}>
      <CustomText style={style.titleText}>Lobby {playerCount}/8</CustomText>

      <CustomText style={style.lobbyCodeLabel}>Your lobby code:</CustomText>

      <CustomText style={style.lobbyCodeText}>69420</CustomText>

      <View style={style.playerListContainer}>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          contentContainerStyle={style.playerList}
          renderItem={({ item }) => (
            <PlayerCard
              // playerCardStyle={style.playerItem}
              avatarUrl={item.avatarUrl}
              nickName={item.nickname}
            />
          )}
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
