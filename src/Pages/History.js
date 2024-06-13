import React, { useState, useEffect } from "react";

// Step 1: Define the Data
const students = [
  { Car_Plate: 'S1234567H', Date_Time: "11/06/2024 10:23:46", Price: 10},
  { Car_Plate: 'S1234567H', Date_Time: "11/06/2024 10:23:46", Price: 10},
  { Car_Plate: 'S1234567H', Date_Time: "11/06/2024 10:23:46", Price: 10},
  // Add more student records as needed
];

// Step 2: Build the Table Component
const StudentTable = () => {
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
        {students.map((student) => (
          <tr key={student.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.Car_Plate}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.Date_Time}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.Price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Step 1: Add a Scrollable Container
const ScrollableTableContainer = () => {
  return (
    <div className="table-container">
      <StudentTable />
    </div>
  );
};

const StudentTableResponsive = () => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Student ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date of Birth</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Major</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <>
            <tr key={student.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span className="cell-header">Student ID:</span> <hr /> {student.id}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span className="cell-header">Name:</span> <hr /> {student.name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span className="cell-header">Date of Birth:</span> <hr /> {student.dob}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <span className="cell-header">Major:</span> <hr /> {student.major}
              </td>
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


// Step 3: Export App Component
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

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', textDecoration: 'underline' }}>History of Payment</h1>
      {isMobileView ? <StudentTableResponsive /> : <ScrollableTableContainer />}
    </div>
  );
}

// Step 4: Styling the Table (CSS)
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
