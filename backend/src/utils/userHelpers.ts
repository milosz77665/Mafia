import { Response } from 'express';
import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs';

export const validateNickname = (nickname: string, res: Response): boolean => {
  if (!nickname) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Nickname is required',
    });
    return false;
  }
  return true;
};

export const validateObjectId = (id: string, res: Response): boolean => {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid User ID format',
    });
    return false;
  }
  return true;
};

export const handleServerError = (error: any, message: string, res: Response) => {
  console.log(error);
  res.status(500).json({
    error: 'Internal Server Error',
    message,
  });
};

export const deleteFile = async (directory: string, prefix: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directory);
    const fileToDelete = files.find((file) => file.startsWith(prefix));

    if (!fileToDelete) {
      console.log(`No file found starting with: ${prefix}`);
      return;
    }

    const filePath = path.join(directory, fileToDelete);
    await fs.promises.unlink(filePath);
    console.log(`File deleted: ${fileToDelete}`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

export const saveAvatar = async (directory: string, id: string, avatar: string): Promise<string> => {
  try {
    const fileName = `${id}_${Date.now()}.jpg`;
    const filePath = path.join(directory, fileName);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    await deleteFile(directory, id);

    const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(filePath, buffer);
    console.log(`Avatar saved: ${filePath}`);

    return `/users/avatars/${fileName}`;
  } catch (error) {
    console.error('Error saving avatar:', error);
    return '';
  }
};
