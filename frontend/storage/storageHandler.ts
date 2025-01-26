import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { Platform } from 'react-native';

export const saveInStorage = async (key: string, value: string) => {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await setItemAsync(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.log(`Error saving ${key}: ${error}`);
  }
};

export const getFromStorage = async (key: string) => {
  let value;

  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      value = await getItemAsync(key);
    } else {
      value = localStorage.getItem(key);
    }
  } catch (error) {
    console.log(`Error reading ${key}: ${error}`);
  }

  return value;
};

export const removeFromStorage = async (key: string) => {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await deleteItemAsync(key);
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.log(`Error removing ${key}: ${error}`);
  }
};
