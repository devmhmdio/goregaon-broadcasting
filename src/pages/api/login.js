import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  try {
    const { its } = req.body;
    await dbConnect();

    const user = await User.findOne({ its });

    if (user) {
      if (user.isLoggedIn === true) {
        res.status(200).send({ status: 'Already logged in' });
      }
      res.status(200).send({ user: user });
      await User.findOneAndUpdate(
        { its },
        { isLoggedIn: true },
        { new: true }
      );
      
    } else {
      res.status(401).send({ error: 'Invalid ITS' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}
