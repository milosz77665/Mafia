import { Request, Response } from 'express';
import { User } from '../models/User';

export const newUser = async (req: Request<{}, {}, { nickname: string }>, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Nickname is required.',
    });
  }

  try {
    const user = new User({ nickname });
    await user.save();

    res.status(201).json({ uid: user._id.toString(), nickname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while saving to the database.',
    });
  }
};

export const updateUser = async (req: Request<{ id: string }, {}, { nickname: string }>, res: Response) => {
  const { id: uid } = req.params;
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Nickname is required.',
    });
  }

  try {
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found.',
      });
    }

    user.nickname = nickname;
    await user.save();

    res.status(200).json({ uid, nickname });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating user data.',
    });
  }
};
