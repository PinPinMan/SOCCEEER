import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';


const StudentTable = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://mysql-back-2-socceeer.apps.hackathon.cnasg.dellcsc.com/cars')
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      });
  }, []);

  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '/';
    return null;
  }
  
  return (
    <table style={{ width: '97%', borderCollapse: 'collapse', margin: '10px auto', justifyContent: 'center' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Plate</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date & Time</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.car_wash_id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.car_plate}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.date_time}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ScrollableTableContainer = () => {
  return (
    <div className="table-container">
      <StudentTable />
    </div>
  );
};

const StudentTableResponsive = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://mysql-back-2-socceeer.apps.hackathon.cnasg.dellcsc.com/cars')
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      });
  }, []);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Wash ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Plate</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date & Time</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <>
            <tr key={car.car_wash_id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.car_wash_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.car_plate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.date_time}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{car.price}</td>
            </tr>
            <tr>
              <td colSpan="4" style={{ height: '20px' }}></td> {/* Empty space between rows */}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReturn = () => {
    window.location.href = '/main';
    console.log("Return button clicked");
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', textDecoration: 'underline' }}>History of Payment</h1>
      {isMobileView ? <StudentTableResponsive /> : <ScrollableTableContainer />}
      <Button onClick={handleReturn} style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>Return</Button>
    </div>
  );
}

const styles = `
.table-container {
  overflow-x: auto;
}
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}
tr {
  border-bottom: 1px solid #ccc;
}
th,
td {
  text-align: left;
  padding: 8px;
  white-space: nowrap;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.cell-header {
  display: none;
}
@media screen and (max-width: 700px) {
  th {
    display: none;
  }
  .cell-header {
    display: block;
    font-weight: bold;
  }
  td {
    display: flex;
    justify-content: space-between;
  }
}
`;

// Create a style tag and append it to the head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
