export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { cardNumber, expiryMonth, expiryYear, cvv, amount } = req.body;
  
      const snapscanSecretKey = process.env.SNAPSCAN_SECRET_KEY; // Store your secret key in environment variables
  
      const response = await fetch('https://api.snapscan.io/v1/payments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${snapscanSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amountInCents: amount,
          paymentMethod: {
            type: 'card',
            cardNumber: cardNumber,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            cvv: cvv,
          },
          currency: 'ZAR',
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        // Payment was successful
        return res.status(200).json({ success: true });
      } else {
        // Payment failed
        return res.status(400).json({ success: false, message: result.error });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }