import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function CarTypes() {
  const carTypes = [
    { name: 'Sedan', logo: 'URL_FOR_SEDAN_LOGO' },
    { name: 'SUV', logo: 'URL_FOR_SUV_LOGO' },
    { name: 'Truck', logo: 'URL_FOR_TRUCK_LOGO' },
    { name: 'Coupe', logo: 'URL_FOR_COUPE_LOGO' },
    { name: 'Convertible', logo: 'URL_FOR_CONVERTIBLE_LOGO' }
  ];

  const iconStyle = { width: 50, height: 50 }; // Adjust the size here

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
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
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {carTypes.map((car) => (
              <Grid item xs={4} sm={4} md={4} key={car.name}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    height: '30vh',
                    display: 'flex',
                    flexDirection: 'column', // Centering content within the button
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  href={`${window.location.pathname}/${car.name.toLowerCase()}`}
                >
                  {car.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
