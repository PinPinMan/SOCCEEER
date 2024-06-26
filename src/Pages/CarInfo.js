import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

const CarInfo = () => {
    const [carplate, setCarplate] = React.useState(localStorage.getItem('carplate_AI') || '');

    const handleCarplateChange = (e) => {
        const value = e.target.value;
        setCarplate(value);
        localStorage.setItem('carplate_AI', value);
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
                    <Typography component="h1" variant="h4" align="center">
                        Enter Carplate Number
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="carplate"
                            label="Carplate Number"
                            name="carplate"
                            autoComplete="carplate"
                            value={carplate}
                            // Increase the size of the textfield
                            sx={{ '& input': { fontSize: '1.5rem' } }}
                            onChange={handleCarplateChange}
                        />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CarInfo;
