const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let qrData = ""; // Simulate storing QR data here

app.post('/create-payin', (req, res) => {
    console.log('Creating Payin...');
    // Simulate creating a payin and getting QR data
    qrData = "Generated QR Data"; // This would be the actual QR data from Tazapay
    res.json({ success: true, qrData });
});

app.get('/fetch-qrcode', (req, res) => {
    console.log('Fetching QR Code...');
    res.json({ qrData });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
