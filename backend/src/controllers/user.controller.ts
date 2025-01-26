import { Request, Response } from 'express';
import { User } from '../models/User';
import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs';

const avatarsDir = path.join(__dirname, '..', 'avatars');

const validateNickname = (nickname: string, res: Response): boolean => {
  if (!nickname) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Nickname is required',
    });
    return false;
  }
  return true;
};

const validateObjectId = (id: string, res: Response): boolean => {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid User ID format',
    });
    return false;
  }
  return true;
};

const handleServerError = (error: any, message: string, res: Response) => {
  console.log(error);
  res.status(500).json({
    error: 'Internal Server Error',
    message,
  });
};

const deleteFile = async (directory: string, prefix: string): Promise<void> => {
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

const saveAvatar = async (id: string, avatar: string): Promise<string> => {
  try {
    const fileName = `${id}_${Date.now()}.jpg`;
    const filePath = path.join(avatarsDir, fileName);

    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir);
    }
    await deleteFile(avatarsDir, id);

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

export const newUser = async (req: Request<{}, {}, { nickname: string; avatar: string }>, res: Response) => {
  const { nickname, avatar } = req.body;
  let imageUrl = '';

  if (!validateNickname(nickname, res)) return;

  try {
    const user = new User({ nickname });
    if (avatar) {
      imageUrl = await saveAvatar(user._id.toString(), avatar);
      user.avatarUrl = imageUrl;
    }
    await user.save();

    res.status(201).json({ id: user._id.toString(), nickname, avatarUrl: imageUrl });
  } catch (error) {
    handleServerError(error, 'An error occurred while saving to the database', res);
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, { nickname: string; avatar: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { nickname, avatar } = req.body;
  let imageUrl = '';

  if (!validateObjectId(id, res) || !validateNickname(nickname, res)) return;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    if (avatar) {
      imageUrl = await saveAvatar(id, avatar);
    }
    user.avatarUrl = imageUrl;
    user.nickname = nickname;
    await user.save();

    res.status(200).json({ id, nickname, avatarUrl: imageUrl });
  } catch (error) {
    handleServerError(error, 'An error occurred while updating user data', res);
  }
};

export const deleteUser = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id, res)) return;

  try {
    deleteFile(avatarsDir, id);
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    res.status(200).json({ id });
  } catch (error) {
    handleServerError(error, 'An error occurred while deleting user data', res);
  }
};
