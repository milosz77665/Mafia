import { FC, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const AutoplayMusic: FC = () => {
  const audioPath = '../assets/audio/super_secret_spy.mp3';
  // '../assets/audio/isnt_that_strange.mp3';
  //'../assets/audio/sneak_peek.mp3'
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTryingToPlay, setIsTryingToPlay] = useState(false);
  const musicVolume = useSelector((state: RootState) => state.sound.musicVolume);

  const playSound = async () => {
    if (!isPlaying && !isTryingToPlay) {
      setIsTryingToPlay(true);

      const { sound } = await Audio.Sound.createAsync(require(audioPath), {
        shouldPlay: true,
        isLooping: true,
      });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
      setIsTryingToPlay(false);
    }
  };

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(musicVolume);
    }
  }, [musicVolume, sound]);

  useEffect(() => {
    playSound();

    const interval = setInterval(() => {
      if (!isPlaying) {
        playSound();
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isPlaying]);

  return <></>;
};

export default AutoplayMusic;
