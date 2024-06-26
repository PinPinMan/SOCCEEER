import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const defaultTheme = createTheme();

export default function CarTypes() {
  const carTypes = [
    { name: 'Saloon Car', logo: 'Saloon Car' },
    { name: 'SUV/ MPV/ Small Van', logo: 'SUV/ MPV/ Small Van' },
    { name: 'Large Van', logo: 'Large Van' },
    { name: 'Big Vans', logo: 'Big Vans' },
    { name: 'Taxi (Saloon)/ Motorcycle', logo: 'Taxi (Saloon)/ Motorcycle' }
  ];

  const [selectedCarType, setSelectedCarType] = React.useState(localStorage.getItem('carType'));
  

  const handleButtonClick = (carType) => {
    localStorage.setItem('carType', carType);
    setSelectedCarType(carType);
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
          <Typography component="h1" variant="h5" align="center">
            Select Car Type
          </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {carTypes.map((car) => (
              <Grid item xs={6} key={car.name}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleButtonClick(car.logo)}
                  sx={{
                    height: '15vh',
                    display: 'flex',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: selectedCarType === car.logo ? 'green' : '#00a5e3',
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
