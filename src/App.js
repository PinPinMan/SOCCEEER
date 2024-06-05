import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const defaultTheme = createTheme();

export default function QRCodeGenerator() {
  const [mobile, setMobile] = React.useState('');
  const [uen, setUen] = React.useState('');
  const [refId, setRefId] = React.useState('');
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');

  const generateQRCode = (amount) => {
    const urlParams = new URLSearchParams({
      mobile,
      uen,
      editable: 0,
      amount,
      ref_id: refId,
      company: 'MINDS'
    });
    const qrCodeUrl = `https://sgqrcode.com/paynow?${urlParams.toString()}`;
    setQrCodeUrl(qrCodeUrl);
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
          <Typography component="h1" variant="h5">
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
          {qrCodeUrl && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <img src={qrCodeUrl} alt="QR Code" style={{ borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
