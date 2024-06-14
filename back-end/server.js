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

app.get('/', (req, res) => {
    return res.json('Hello World');
})

app.get('/cars', (req, res) => {
    const sql = 'SELECT * FROM cars';
    db.query(sql, (err, result) => {
        if(err)
             throw err;
        return res.json(result);
    });
})

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
