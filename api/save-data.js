import { Redis } from '@upstash/redis';

// Vercel ke environment variables se Redis connect karein
// (KV_REST_API_URL aur KV_REST_API_TOKEN automatically utha lega)
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  // Sirf POST request allow karein
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mobile, password } = req.body;

    // Validation
    if (!mobile || !password) {
      return res.status(400).json({ error: 'Mobile and password are required' });
    }

    // Data ko Redis mein save karein
    // Key: user:03001234567
    await redis.set(`user:${mobile}`, {
      mobile: mobile,
      password: password,
      timestamp: new Date().toISOString(),
    });

    // Success response
    return res.status(200).json({ 
      success: true, 
      message: 'Data saved successfully' 
    });

  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ 
      error: 'Failed to save data',
      details: error.message 
    });
  }
}