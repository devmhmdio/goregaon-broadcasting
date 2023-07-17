import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  const { its } = req.body;
  await dbConnect();

  const user = await User.findOne({ its });

  if (user) {
    req.session.set('user', user);
    await req.session.save();
    res.status(200).send({ done: true });
  } else {
    res.status(401).send({ error: 'Invalid ITS' });
  }
}
