import { Request, Response } from 'express';
import { User } from '../models/User';
import path from 'path';
import { deleteFile, handleServerError, saveAvatar, validateNickname, validateObjectId } from '../utils/userHelpers';

const avatarsDir = path.join(__dirname, '..', 'avatars');

export const newUser = async (req: Request<{}, {}, { nickname: string; avatar: string }>, res: Response) => {
  const { nickname, avatar } = req.body;
  let imageUrl = '';

  if (!validateNickname(nickname, res)) return;

  try {
    const user = new User({ nickname });
    if (avatar) {
      imageUrl = await saveAvatar(avatarsDir, user._id.toString(), avatar);
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
      imageUrl = await saveAvatar(avatarsDir, id, avatar);
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
