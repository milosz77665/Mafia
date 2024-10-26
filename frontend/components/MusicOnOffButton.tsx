import SoundOffIcon from '@/assets/icons/SoundOffIcon';
import SoundOnIcon from '@/assets/icons/SoundOnIcon';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { soundActions } from '../reducers/soundReducer';
import { Pressable } from 'react-native';

const MusicOnOffButton = () => {
  const dispatch = useDispatch();
  const musicVolume = useSelector((state: RootState) => state.sound.musicVolume);

  return (
    <>
      {musicVolume ? (
        <Pressable
          onPress={() => {
            dispatch(soundActions.changeMusicVolume(0.0));
          }}
        >
          <SoundOnIcon />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            dispatch(soundActions.changeMusicVolume(1.0));
          }}
        >
          <SoundOffIcon />
        </Pressable>
      )}
    </>
  );
};

export default MusicOnOffButton;
