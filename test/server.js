const express = require('express');
const bodyParser = require('body-parser');
const jose = require('node-jose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Middleware for authentication
const authenticate = (req, res, next) => {
  const clientId = req.headers['client-id'];
  const clientSecret = req.headers['client-secret'];

  if (clientId !== 'your_client_id' || clientSecret !== 'your_client_secret') {
    return res.status(403).send({ message: 'Authorization credentials are missing or invalid.' });
  }
  next();
};

app.post('/payment/qrCode', authenticate, async (req, res) => {
  try {
    const payload = req.body;

    // Generate a JWS token
    const key = await jose.JWK.createKey('oct', 256, { alg: 'HS256', use: 'sig' });
    const input = JSON.stringify(payload);
    const jws = await jose.JWS.createSign({ format: 'compact' }, key)
      .update(input)
      .final();

    // Encrypt the JWS token using JWE
    const keystore = jose.JWK.createKeyStore();
    const key2 = await keystore.add({ kty: 'oct', k: 'your-encryption-key-here', use: 'enc' });
    const jwe = await jose.JWE.createEncrypt({ format: 'compact' }, key2)
      .update(jws)
      .final();

    // Mock response for successful operation
    const response = {
      api_gw: {
        messageId: "89817674-daOO-4883",
        returnCode: "200",
        returnReason: "Successful operation",
        sentTime: new Date().toISOString(),
        responseTime: new Date().toISOString()
      },
      response: {
        txnRef: payload.txnRef,
        currency: payload.currency,
        amount: payload.amount,
        proCode: "000000",
        proMsg: "Transaction Successful",
        qrCode: "QR_CODE_DATA"
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
