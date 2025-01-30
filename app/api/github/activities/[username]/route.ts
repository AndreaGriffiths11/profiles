import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    res.status(400).json({ error: 'Invalid username' });
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch activities' });
      return;
    }

    const activities = await response.json();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
