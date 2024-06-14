require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server');
    
    // Create 'users' table
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
    db.query(createUserTable, (err, result) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created successfully');
        }
    });

    // Create 'cars' table
    const createCarsTable = `
        CREATE TABLE IF NOT EXISTS cars (
            car_id INT AUTO_INCREMENT PRIMARY KEY,
            car_plate VARCHAR(50) NOT NULL,
            date_time DATETIME NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        )
    `;
    db.query(createCarsTable, (err, result) => {
        if (err) {
            console.error('Error creating cars table:', err);
        } else {
            console.log('Cars table created successfully');
        }
    });

    const dummyUser = {
        username: 'abc',
        password: '123',
    };

    const sql = 'INSERT INTO users SET ?';
    db.query(sql, dummyUser, (err, result) => {
        if (err) {
            console.error('Error inserting dummy user:', err);
        } else {
            console.log('Dummy user inserted successfully');
        }
    });
});


app.get('/', (req, res) => {
    return res.json('Hello World');
})

app.get('/cars/:date', (req, res) => {
    const date = req.params.date;
    console.log(date + ' is the date');
    let sql = 'SELECT * FROM cars';
  
    // If date is provided, add a WHERE clause to filter by date
    if (date) {
      // Assuming date is in YYYY-MM-DD format
      sql += ` WHERE DATE(date_time) = '${date}'`;
    }
  
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      return res.json(result);
    });
  });
  

app.get('/username/:username', (req, res) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [req.params.username], (err, result) => {
        if(err)
            throw err;
        return res.json(result);
    });
})

app.listen(8081, () => {
    console.log('Server is running on port 8081');
})
