import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const StudentTable = ({ date }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`https://mysql-back-3-socceeer.apps.hackathon.cnasg.dellcsc.com/cars/${date?`${date}`:''}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [date]);

  return (
    <div style={{height:'60vh',  overflowY: 'scroll'}}>
    <table style={{ width: '97%', borderCollapse: 'collapse', margin: '10px auto', justifyContent: 'center' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Plate</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
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
    </div>
  );
};

const ScrollableTableContainer = ({ date }) => {
  return (
    <div className="table-container">
      <StudentTable date={date} />
    </div>
  );
};


const StudentTableResponsive = ({ date }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`https://mysql-back-3-socceeer.apps.hackathon.cnasg.dellcsc.com/cars/${date ? `${date}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      });
  }, [date]);

  return (
    <div style={{height:'60vh',  overflowY: 'scroll'}}>
      {cars.map((car) => (
        <div key={car.car_wash_id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><strong>Car Plate:</strong> {car.car_plate}</li>
            <li><strong>Date & Time:</strong> {car.date_time}</li>
            <li><strong>Price:</strong> {car.price}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 700);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReturn = () => {
    window.location.href = '/main';
    console.log("Return button clicked");
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', textDecoration: 'underline' }}>History of Payment</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ margin: '10px auto', display: 'block' }}
      />
      {isMobileView ? <StudentTableResponsive date={selectedDate} /> : <ScrollableTableContainer date={selectedDate} />}
      <Button onClick={handleReturn} style={{ position:'absolute', bottom: '10px', left: '10px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>Return</Button>
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