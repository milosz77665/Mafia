import { Request, Response } from 'express';
import { User } from '../models/User';
import { ObjectId } from 'mongodb';

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

export const newUser = async (req: Request<{}, {}, { nickname: string }>, res: Response) => {
  const { nickname } = req.body;

  if (!validateNickname(nickname, res)) return;

  try {
    const user = new User({ nickname });
    await user.save();

    res.status(201).json({ id: user._id.toString(), nickname });
  } catch (error) {
    handleServerError(error, 'An error occurred while saving to the database', res);
  }
};

export const updateUser = async (req: Request<{ id: string }, {}, { nickname: string }>, res: Response) => {
  const { id } = req.params;
  const { nickname } = req.body;

  if (!validateObjectId(id, res) || !validateNickname(nickname, res)) return;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    user.nickname = nickname;
    await user.save();

    res.status(200).json({ id, nickname });
  } catch (error) {
    handleServerError(error, 'An error occurred while updating user data', res);
  }
};

export const deleteUser = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const { id } = req.params;

  if (!validateObjectId(id, res)) return;

  try {
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
