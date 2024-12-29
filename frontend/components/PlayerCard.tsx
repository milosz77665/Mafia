import { FC } from 'react';
import React from 'react';
import { Image, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1, 
    borderBottomColor: colors.disabledGrey,      
  },

  avatarContainer: {

  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  playerInfoContainer: {
    marginTop: 10,
    marginLeft: 10,
  },

  nickNameText: {
    
  },
  
});

interface PlayerCardProps {
  nickName: string;
  avatarUrl?: string;
//   playerCardStyle?: StyleProp<ViewStyle>;
}

const PlayerCard: FC<PlayerCardProps> = ({ nickName, avatarUrl }) => {
  return (
    <View style={style.mainContainer}>
      <View style={style.avatarContainer}>{<Image source={{ uri: avatarUrl }} style={style.avatar} />}</View>

      <View style={style.playerInfoContainer}>
        <Text style={style.nickNameText}>{nickName}</Text>
      </View>
    </View>
  );
};

export default PlayerCard;
