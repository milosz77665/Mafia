import { StyleSheet, View, Image, Pressable, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CameraIcon from '@/assets/icons/CameraIcon';
import GalleryIcon from '@/assets/icons/GalleryIcon';
import { colors } from '@/constants/colors';
import AvatarIcon from '@/assets/icons/AvatarIcon';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/redux/reducers/userReducer';
import { RootState } from '@/redux/store';
import CrossIcon from '@/assets/icons/CrossIcon';
import { errorActions } from '@/redux/reducers/errorReducer';

const style = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.black,
  },

  avatar: {
    width: 148,
    height: 148,
    borderRadius: 100,
  },

  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
  },

  iconLeft: {
    position: 'absolute',
    bottom: -5,
    left: -5,
  },

  iconRight: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },

  iconTop: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

const AvatarPicker = () => {
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const dispatch = useDispatch();

  const uploadPicture = async (fromCamera: boolean): Promise<void> => {
    const imagePickerConfig: ImagePicker.ImagePickerOptions = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };

    const { status } = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') return;

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync(imagePickerConfig)
      : await ImagePicker.launchImageLibraryAsync(imagePickerConfig);

    if (result.canceled) return;

    let picture = result.assets[0].uri;
    const fileSize = await getFileSize(picture);
    if (fileSize === null) return;

    if (!validateFileSize(fileSize)) return;

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      picture = `data:image/jpeg;base64,${await FileSystem.readAsStringAsync(picture, {
        encoding: FileSystem.EncodingType.Base64,
      })}`;
    }

    dispatch(userActions.setAvatar(picture));
  };

  const validateFileSize = (fileSize: number): boolean => {
    if (fileSize / (1024 * 1024) > 2) {
      dispatch(
        errorActions.showError({
          id: Date.now().toString(),
          title: 'File Size Exceeded',
          message: 'The uploaded file is too large. The maximum file size allowed is 2MB',
        })
      );
      return false;
    }
    return true;
  };

  const validateFileExistence = (exists: boolean): boolean => {
    if (!exists) {
      dispatch(
        errorActions.showError({
          id: Date.now().toString(),
          title: 'File Not Found',
          message: 'The requested file could not be found. Please try selecting a different file',
        })
      );
      return false;
    }
    return true;
  };

  const getFileSize = async (uri: string): Promise<number | null> => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!validateFileExistence(fileInfo.exists) || !fileInfo.exists) return null;
      return fileInfo.size;
    } else {
      const response = await fetch(uri);
      if (!validateFileExistence(response.ok)) return null;
      const blob = await response.blob();
      return blob.size;
    }
  };

  return (
    <View style={style.avatarContainer}>
      {avatar ? (
        <>
          <Image source={{ uri: avatar }} style={style.avatar} />
          <Pressable
            onPress={async () => {
              dispatch(userActions.setAvatar(''));
            }}
            style={[style.iconContainer, style.iconTop]}
          >
            <CrossIcon color={colors.black} />
          </Pressable>
        </>
      ) : (
        <AvatarIcon size={50} />
      )}

      {(Platform.OS === 'ios' || Platform.OS === 'android') && (
        <Pressable
          onPress={() => {
            uploadPicture(true);
          }}
          style={[style.iconContainer, style.iconLeft]}
        >
          <CameraIcon />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          uploadPicture(false);
        }}
        style={[style.iconContainer, style.iconRight]}
      >
        <GalleryIcon />
      </Pressable>
    </View>
  );
};

export default AvatarPicker;
