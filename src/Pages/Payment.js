import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHref, useLocation } from 'react-router-dom';
// const fetch = require('node-fetch');
const createPaymentRequest = require('./test');

// Call the function
createPaymentRequest();

const defaultTheme = createTheme();

const url = 'https://api.sandbox.hit-pay.com/v1/payment-requests';
  
const data = {
  amount: "15.00",
  currency: "SGD",
  email: "example@example.com",
  payment_methods: ["paynow_online"],
  purpose: "S1234567J",
  reference_number: "S1234567J",
  expiry_date: "2030-02-02 01:01:01"
};

const headers = {
  'Content-Type': 'application/json',
  'X-BUSINESS-API-KEY': '4867e54baa78dfc7423ef254d08e0994592eef664afffad81fe266cc1486cbe7',
  'X-Requested-With': 'XMLHttpRequest'
};

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(responseData => {
  console.log('Success:', responseData.url);
})
.catch(error => {
  console.error('Error:', error);
});



const Payment = () => {
  const [mobile, setMobile] = React.useState('');
  const [uen, setUen] = React.useState('');
  const [refId, setRefId] = React.useState('');
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');

  const generateQRCode = async (amount) => {
    // const urlParams = new URLSearchParams({
    //   '97262926': mobile,
    //   uen,
    //   editable: 0,
    //   amount,
    //   ref_id: refId,
    //   company: 'MINDS'
    // });
    // const qrCodeUrl = `https://sgqrcode.com/paynow?${urlParams.toString()}`;

    
  };
  
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src="https://www.minds.org.sg/wp-content/uploads/2020/04/logo-minds@2x.png" alt="MINDS Logo" style={{ width: '200px', height: 'auto' }} />
          </Box>
          <Typography component="h1" variant="h5" align="center">
            Generate PayNow QR Code
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="mobile"
              label="Mobile Number (optional)"
              name="mobile"
              autoComplete="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="uen"
              label="UEN"
              name="uen"
              autoComplete="uen"
              value={uen}
              onChange={(e) => setUen(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="ref_id"
              label="Reference ID"
              name="ref_id"
              autoComplete="ref_id"
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
              <Button variant="contained" color="primary" onClick={() => generateQRCode(10)} sx={{ flexGrow: 1, mx: 1 }}>
                $10
              </Button>
              <Button variant="contained" color="primary" onClick={() => generateQRCode(15)} sx={{ flexGrow: 1, mx: 1 }}>
                $15
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Payment