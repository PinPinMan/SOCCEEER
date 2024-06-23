import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../index.css';
import { colors } from '@mui/material';

const defaultTheme = createTheme();

export default function SignIn() {
  const [shakeForm, setShakeForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    try {
      const response = await fetch(`https://mysql-back-2-socceeer.apps.hackathon.cnasg.dellcsc.com/username/${username}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const userData = await response.json();
      if (userData.length === 0) {
        // Trigger CSS animation for invalid login attempt
        setShakeForm(true);
        setTimeout(() => {
          setShakeForm(false);
        }, 1000); // Reset shake animation after 1s
        return;
      }

      if (userData[0].password === password) {
        sessionStorage.setItem('isLoggedIn', true);
        window.location.href = '/main';
      } else {
        // Trigger CSS animation for invalid login attempt
        setShakeForm(true);
        setTimeout(() => {
          setShakeForm(false);
        }, 1000); // Reset shake animation after 1s
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle fetch or other errors here
    }
  };

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
              style={{ width: '200px', height: 'auto',  }}
            />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            // sx={{ mt: 1, border: shakeForm ? '2px solid red' : 'none', borderRadius: '5px', padding: '15px', transition: 'border .3s ease-out' }}
            className={shakeForm ? 'shake-element' : ''}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={shakeForm}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={shakeForm}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Log In
            </Button>
              {shakeForm ? <p className="error-message">Invalid username or password</p> : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

