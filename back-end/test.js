var express = require("express");
var mysql = require('mysql2');
const cors = require('cors');
const https = require('https');

var app = express();
app.use(cors({
    origin: 'https://minds-socceeer.apps.hackathon.cnasg.dellcsc.com', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use(express.json()); // for parsing application/json

var PORT = 8080;

var db = mysql.createPool({
    host: 'mysql',
    user: 'mysql',
    password: 'mysql_p@ssw0rd',
    database: 'sampledb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', 'localhost', port);
});

//GET STATUS ENDPOINT
app.get('/', function (req, res) {
    res.send('Our Server is Up and Running!');
});

app.get('/cars', (req, res) => {
    const sql = 'SELECT * FROM cars';
    db.query(sql, (err, result) => {
        if(err) throw err;
        return res.json(result);
    });
});

app.get('/username/:username', (req, res) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [req.params.username], (err, result) => {
        if(err) throw err;
        return res.json(result);
    });
});

app.post('/transaction/:car/:plate', (req, res) => {
    const car = req.params.car;
    var price = 0.00;
    if (car == 'Sal'){
        price = 12.00;
    } else if (car == 'SUV'){
        price = 13.00;
    } else if (car == 'Lar'){
        price = 17.00;
    } else if (car == 'Big'){
        price = 22.00;
    } else if (car == 'Tax'){
        price = 5.00;
    }
    const sql = 'INSERT INTO cars (car_plate, price) VALUES (?, ?)';
    db.query(sql, [req.params.plate.replace('%',''), price], (err, result) => {
        if(err)
            throw err;
        return res.json(result);
    });
})



app.get('/cars/:date', (req, res) => {
    const date = req.params.date;
    console.log(date + ' is the date');
    let sql = `SELECT car_type, car_plate, TIME_FORMAT(date_time, '%H:%i') AS date_time, price,
    CASE
      WHEN price = 12 THEN 'Saloon Car'
      WHEN price = 13 THEN 'SUV/ MPV/ Small Van'
      WHEN price = 17 THEN 'Large Van'
      WHEN price = 22 THEN 'Big Vans'
      WHEN price = 5 THEN 'Taxi (Saloon)/ Motorcycle'
      ELSE 'Unknown'
    END AS car_type
    FROM cars`;
  
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

app.get('/summary/:date', (req, res) => {
    const date = req.params.date;
    console.log(date + ' is the date');
    let sql = `SELECT 
      SUM(price) AS total,
      SUM(CASE WHEN price = 12 THEN price ELSE 0 END) AS saloon,
      SUM(CASE WHEN price = 13 THEN price ELSE 0 END) AS suv,
      SUM(CASE WHEN price = 17 THEN price ELSE 0 END) AS large,
      SUM(CASE WHEN price = 22 THEN price ELSE 0 END) AS big,
      SUM(CASE WHEN price = 5 THEN price ELSE 0 END) AS taxi
    FROM cars`;
  
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


// New endpoint for HitPay API
app.get('/hitpay/:amount/:carplate', (req, res) => {
    if (req.params.amount == undefined && req.params.carplate == undefined){
        return res.json({"Error":"Wrong Header"})
    }
    console.log(req.params.carplate)
    const data = JSON.stringify({
        "amount": req.params.amount,
        'currency': 'SGD',
        "email": "example@example.com",
        "payment_methods[]": ["paynow_online"],
        "purpose": req.params.carplate,
        "reference_number": req.params.carplate,
        "expiry_date": "2030-02-02 01:01:01",
        "redirect_url": "https://minds-socceeer.apps.hackathon.cnasg.dellcsc.com/success"
    });

    const options = {
        hostname: 'api.sandbox.hit-pay.com',
        path: '/v1/payment-requests',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-BUSINESS-API-KEY': '4867e54baa78dfc7423ef254d08e0994592eef664afffad81fe266cc1486cbe7',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    let responseData = '';

    const hitpayReq = https.request(options, (apiRes) => {
        apiRes.on('data', (chunk) => {
            responseData += chunk;
        });

        apiRes.on('end', () => {
            return res.json(JSON.parse(responseData));
        });
    });

    hitpayReq.on('error', (error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while making the request to the HitPay API.' });
    });

    hitpayReq.write(data);
    hitpayReq.end();
});

app.post('/upload', async (req, res) => {
    const { name, data } = req.files.pic;

    if (name && data) {
        try {
            const sql = 'INSERT INTO img (name, img) VALUES (?, ?)';
            await db.promise().query(sql, [name, data]);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});