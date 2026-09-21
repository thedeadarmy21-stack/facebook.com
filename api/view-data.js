import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // Saari keys dhundhein jo "user:" se shuru hoti hain
    const keys = await redis.keys('user:*');

    if (keys.length === 0) {
      return res.status(200).json({ 
        message: 'Abhi tak koi data save nahi hua.',
        total: 0,
        data: []
      });
    }

    // Har key ka data fetch karein
    const users = [];
    for (const key of keys) {
      const userData = await redis.get(key);
      users.push({
        key: key,
        data: userData
      });
    }

    // Data JSON format mein return karein
    return res.status(200).json({
      total: users.length,
      data: users
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data',
      details: error.message 
    });
  }
}