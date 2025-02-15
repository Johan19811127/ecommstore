import { useEffect } from 'react';

const privatekey= process.env.YOCO_TEST_PRIVATE_KEY
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { token } = req.body;
  
      try {
        const response = await axios.post(
          'https://online.yoco.com/v1/charges/',
          {
            token,
            amountInCents: 10000, // Ensure this matches the amount from the frontend
            currency: 'ZAR',
          },
          {
            headers: {
              'X-Auth-Secret-Key': 'your-secret-key-here', // Replace with your Yoco secret key
            },
          }
        );
  
        if (response.data.status === 'successful') {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false });
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }