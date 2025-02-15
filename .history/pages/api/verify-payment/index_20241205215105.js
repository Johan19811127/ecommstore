import { useEffect } from 'react';
import axios from 'axios';



export default async function handler(req, res) {
 
    if (req.method === 'POST') {
      const { token } = req.body;
      const privateKey= sk_test_960bfde0VBrLlpK098e4ffeb53e1
      try {
        const response = await axios.post(
          'https://payments.yoco.com/api/checkouts',
          {
          token,
            amountInCents: 10000, // Ensure this matches the amount from the frontend
            currency: 'ZAR',
          },
          {
            headers: {
              'X-Auth-Secret-Key': privateKey, // Replace with your Yoco secret key
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