import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function CarTypes() {
  const carTypes = [
    { name: '4 Seater', logo: '4_Seater' },
    { name: '6 Seater', logo: '6_Seater' },
    { name: 'Bigger Vehicle', logo: 'Big_Veh' }

  ];

  const navigate = useNavigate();

  const handleButtonClick = (carType) => {
    navigate(`/payment/${carType}`);
  };

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
              <Grid item xs={6} key={car.name}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleButtonClick(car.logo)}
                  sx={{
                    height: '30vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
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
