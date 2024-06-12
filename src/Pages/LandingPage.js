import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const iconStyle = { width: 50, height: 50 }; // Adjust the size here

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            <img
              src="https://www.minds.org.sg/wp-content/uploads/2020/04/logo-minds@2x.png"
              alt="MINDS Logo"
              style={{ width: '200px', height: 'auto' }}
            />
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: '30vh',
                display: 'flex',
                width: "40vh",
                justifyContent: 'center',
                alignItems: 'center',
              }}
              href='/CarTypes'
            >
              <Person2OutlinedIcon sx={iconStyle} />
              Workers
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: '30vh',
                width: "40vh",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              href='/login'
            >
              <AdminPanelSettingsOutlinedIcon sx={iconStyle} />
              Admin
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
