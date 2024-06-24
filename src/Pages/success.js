// src/SuccessMessage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const SuccessMessage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        navigate('/');
      }
    }, 500); // Countdown every second

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img
                    src="https://www.minds.org.sg/wp-content/uploads/2020/04/logo-minds@2x.png"
                    alt="MINDS Logo"
                    style={{ width: '200px', height: 'auto' }}
            />
            </Box>
        <h1 style={{ fontSize: '75px' }}>Payment Success!</h1>
        <p style={{ fontSize: '18px' }}>You will be redirected shortly...</p>
        <p style={{ fontSize: '16px' }}>{countdown}</p>
    </div>
);
};

export default SuccessMessage;
