import React, { useState, useEffect } from "react";

// Step 1: Define the Data
const students = [
  { id: 1, name: "Alice Johnson", dob: "2001-04-15", major: "Computer Science" },
  { id: 2, name: "Bob Smith", dob: "2000-09-08", major: "Mathematics" },
  { id: 3, name: "Carol Williams", dob: "1999-02-23", major: "Physics" },
  // Add more student records as needed
];

// Step 2: Build the Table Component
const StudentTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Major</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.dob}</td>
            <td>{student.major}</td>
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

// Step 2: Create Responsive Table Component
const StudentTableResponsive = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Major</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>
              <span className="cell-header">Student ID:</span> {student.id}
            </td>
            <td>
              <span className="cell-header">Name:</span> {student.name}
            </td>
            <td>
              <span className="cell-header">Date of Birth:</span> {student.dob}
            </td>
            <td>
              <span className="cell-header">Major:</span> {student.major}
            </td>
          </tr>
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
