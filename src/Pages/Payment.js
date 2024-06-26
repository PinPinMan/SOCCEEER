// src/DataFetcher.js
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var carplate = localStorage.getItem("carplate_AI");
  var carType = localStorage.getItem("carType");
  var price = 0.00
  if (carType == 'Saloon Car'){
      price = 12;
  } else if (carType == 'SUV/ MPV/ Small Van'){
      price = 13;
  } else if (carType == 'Large Van'){
      price = 17;
  } else if (carType == 'Big Vans'){
      price = 22
  } else if (carType == 'Taxi (Saloon)/ Motorcycle'){
      price = 5;
  }

  useEffect(() => {
    fetch(`https://mysql-back-3-socceeer.apps.hackathon.cnasg.dellcsc.com/hitpay/${price}/${carplate}`)
      .then(response => response.json())
      .then(data => {
        setData(data.url);
        setLoading(false);
        // Redirect to external URL after 3 seconds
          window.location.href = data.url;
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Loading...</h1>
    </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Loading...</h1>
    </div>
  );
};

export default DataFetcher;
