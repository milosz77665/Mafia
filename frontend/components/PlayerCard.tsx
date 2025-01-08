import { FC } from 'react';
import React from 'react';
import { Image, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { colors } from '@/constants/colors';

const style = StyleSheet.create({
  playerCard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.disabledGrey,
  },

  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  playerInfoContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },

  nicknameText: {
    fontSize: 14,
    color: colors.black,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  icon: {
    width: 24,
    height: 24,
  },
});

interface PlayerCardProps {
  playerNickname: string;
  avatarUrl?: string;
  icon?: React.ReactNode;
  playerCardStyle?: StyleProp<ViewStyle>;
  nicknameTextStyle?: StyleProp<TextStyle>;
}

const PlayerCard: FC<PlayerCardProps> = ({playerNickname, avatarUrl, icon, playerCardStyle, nicknameTextStyle}) => {
  return (
    <View style={[style.playerCard, playerCardStyle]}>
      <View style={style.avatarContainer}>
        {avatarUrl && <Image source={{ uri: avatarUrl }} style={style.avatar} />}
      </View>

      <View style={style.playerInfoContainer}>
        <Text style={[style.nicknameText, nicknameTextStyle]}>{playerNickname}</Text>
      </View>

      {icon && (
        <View style={style.iconContainer}>
          {icon}
        </View>
      )}
    </View>
  );
};

export default PlayerCard;
