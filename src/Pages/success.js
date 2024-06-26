// src/SuccessMessage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const SuccessMessage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const sendTransaction = async () => {
      const car = localStorage.getItem('carType').slice(0,3) // Replace with the actual car type you want to send
      const plate = localStorage.getItem('carplate_AI').replace(/\s/g, '');;   // Replace with the actual plate you want to send

      const response = await fetch(`https://mysql-back-3-socceeer.apps.hackathon.cnasg.dellcsc.com/transaction/${car}/${plate}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Transaction successful');
      } else {
        console.error('Transaction failed');
      }
    };

    sendTransaction();

    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        navigate('/');
      }
    }, 1000); // Countdown every second

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
